import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "../../db/client"

interface Infos {
    musicId: string,
    id: number
}

const InfosSchema = z.object({
    musicId: z.string().trim().max(150),
    id: z.number()
})

export const updateMusic = async(req: Request, res: Response): Promise<void> => {
    try {
        const { musicId, id }: Infos = InfosSchema.parse(req.body)

        const page = await prisma.pages.findUnique({ where: { id } })
        if (!page) {
            res.status(404).json({ msg: "Página não encontrada" })
            return
        }

        const updatedPage = await prisma.pages.update({
            where: { id },
            data: { musicId: musicId }, 
        })

        res.status(200).json({ msg: "Musica alterada", updatedPage })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}
