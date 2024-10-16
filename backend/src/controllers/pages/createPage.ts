import { prisma } from "../../db/client"
import { Request, Response } from "express"
import { z } from "zod"

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

        const page = await prisma.pages.create({
            data: {
                title,
                image: {
                    create: {
                        content: image.buffer,
                        filename: image.originalname + Date.now()
                    }
                },
                users: { connect: { id: Number(userId) } },
            },
        })

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
