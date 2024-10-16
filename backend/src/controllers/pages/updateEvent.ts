import { Request, Response } from "express"
import { prisma } from "../../db/client"
import { z } from "zod"

interface Infos {
    title: string,
    starts_at: string,
    id: number,
}

const InfosSchema = z.object({
    title: z.string().trim().max(150),
    starts_at: z.string().datetime().trim(),
    id: z.number()
})

export const updateEvent = async(req: Request, res: Response): Promise<void> => {
    try {
        const { title, starts_at, id }: Infos = InfosSchema.parse(req.body)

        const event = await prisma.events.findUnique({ where: { id } })
        if (!event) {
            res.status(404).json({ msg: "Evento não encontrado" })
            return
        }

        const updatedEvent = await prisma.events.update({
            where: { id },
            data: {
                title,
                starts_at,
            }
        })

        res.status(200).json({ msg: "Evento atualizado com sucesso", updatedEvent })
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(req)
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}