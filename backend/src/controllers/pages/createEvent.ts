import { Request, Response } from "express"
import { prisma } from "../../db/client"
import { z } from "zod"

interface Event {
    title: string,
    starts_at: string,
    pageId: number,
}

const EventSchema = z.object({
    title: z.string().trim().max(150),
    starts_at: z.string().datetime().trim(),
    pageId: z.number()
})

export const createEvent = async(req: Request, res: Response): Promise<void> => {
    try {
        const { title, starts_at, pageId }: Event = EventSchema.parse(req.body)

        const event = await prisma.events.create({
            data: {
                title,
                starts_at,
                page: { connect: { id: pageId } }
            }
        })

        res.status(201).json({ msg: "Evento criado com sucesso", event })
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
