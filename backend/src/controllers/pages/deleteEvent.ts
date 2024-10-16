import { Request, Response } from "express"
import { prisma } from "../../db/client"
import { z } from "zod"

interface Infos {
    id: number,
}

const InfosSchema = z.object({
    id: z.number()
})

export const deleteEvent = async(req: Request, res: Response): Promise<void> => {
    try {
        const { id }: Infos = InfosSchema.parse(req.body)

        const event = await prisma.events.findUnique({ where: { id } })
        if (!event) {
            res.status(404).json({ msg: "Evento não encontrado" })
            return
        }

        await prisma.events.delete({ where: { id } })

        res.status(200).json({ msg: "Evento deletado com sucesso" })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}