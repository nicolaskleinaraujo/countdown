import { Request, Response } from "express"
import { prisma } from "../../db/client"

export const getPage = async(req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id
        const userId: string | string[] | undefined = req.headers.userid

        const page = await prisma.pages.findUnique({ 
            where: { id: Number(id) },
            include: { 
                image: false, 
                Events: true, 
                users: true 
            },
        })

        if (!page) {
            res.status(404).json({ msg: "Page não encontrada" })
            return
        }

        // Validates if user is in the page
        if (!page.users.some(user => user.id === Number(userId))) {
            res.status(401).json({ msg: "Usuario não está na page" })
            return
        }

        res.status(200).json({ msg: "Page carregada com sucesso", page })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}
