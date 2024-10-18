import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { prisma } from "../../db/client"

interface Infos {
    pageId: number
}

const InfosSchema = z.object({
    pageId: z.number(),
})

export const createInvite = async(req: Request, res: Response): Promise<void> => {
    try {
        const { pageId }: Infos = InfosSchema.parse(req.body)

        const page = await prisma.pages.findUnique({ where: { id: pageId } })
        if (!page) {
            res.status(404).json({ msg: "Página não encontrada" })
            return
        }

        const inviteToken: string = jwt.sign({ pageId }, process.env.JWT_SECRET as string, { expiresIn: "7d" })

        res.status(200).json({ msg: "Link criado com sucesso", inviteToken })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}
