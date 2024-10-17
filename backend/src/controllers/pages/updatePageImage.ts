import { prisma } from "../../db/client"
import { Request, Response } from "express"
import { z } from "zod"
import sharp = require("sharp")

interface Infos {
    image: Express.Multer.File,
    id: string
}

const InfosSchema = z.object({
    image: z.custom<Express.Multer.File>(),
    id: z.string()
})

export const updatePageImage = async(req: Request, res: Response): Promise<void> => {
    try {
        const { image, id }: Infos = InfosSchema.parse({
            image: req.file,
            id: req.body.id
        })

        const updatedPage = await prisma.pages.update({
            where: { id: Number(id) },
            data: {
                image: {
                    update: {
                        content: await sharp(image.buffer).toFormat("webp").toBuffer(),
                        filename: image.originalname + Date.now()
                    }
                }
            }
        })

        res.status(200).json({ msg: "Pagina atualizada com sucesso", updatedPage })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}