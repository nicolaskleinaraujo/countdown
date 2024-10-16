import { prisma } from "../../db/client"
import { Request, Response } from "express"
import { z } from "zod"

interface Infos {
    title: string,
    id: number
}

const InfosSchema = z.object({
    title: z.string().trim().max(150),
    id: z.number()
})

export const updatePageTitle = async(req: Request, res: Response): Promise<void> => {
    try {
        const { title, id }: Infos = InfosSchema.parse(req.body)

        const updatedPage = await prisma.pages.update({
            where: { id },
            data: { title }
        })

        res.status(200).json({ msg: "Page atualizada com sucesso", updatedPage })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}
