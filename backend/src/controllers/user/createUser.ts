import { prisma } from "../../db/client"
import { Request, Response } from "express"
import { z } from "zod"

const UserSchema = z.object({
    email: z.string().email().max(150).trim(),
    password: z.string().max(150).trim().min(5),
})

export const createUser = async(req: Request, res: Response) => {
    try {
        const data = UserSchema.parse(req.body)

        res.status(200).json({ data, msg: "Usuario criado com sucesso" })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
        }
    }

}
