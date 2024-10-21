import { prisma } from "../../db/client"
import { Request, Response } from "express"
import { z } from "zod"
import { Pages } from "@prisma/client"
import sharp = require("sharp")

interface ImagesInfos {
    id: number
    filename: string
    content: string | Buffer
}

interface PagesInfos extends Pages {
    image: ImagesInfos,
}

interface Page {
    title: string,
    image: Express.Multer.File,
}

const PageSchema = z.object({
    title: z.string().trim().max(150),
    image: z.custom<Express.Multer.File>(),
})

export const createPage = async(req: Request, res: Response): Promise<void> => {
    try {
        const { title, image }: Page = PageSchema.parse({
            title: req.body.title,
            image: req.file,
        })

        const userId: string | string[] | undefined = req.headers.userid
        if (userId === undefined) {
            res.status(401).json({ msg: "Informações insuficientes" })
            return
        }

        const page: PagesInfos = await prisma.pages.create({
            data: {
                title,
                image: {
                    create: {
                        content: await sharp(image.buffer).resize(400, 400).toFormat("webp").toBuffer(),
                        filename: image.originalname + Date.now()
                    }
                },
                users: { connect: { id: Number(userId) } },
            },
            include: { Events: true, image: true },
        })

        // Converting image to base64
        page.image.content = page.image.content.toString("base64")

        res.status(201).json({ msg: "Page criada com sucesso", page })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}
