import { prisma } from "../../db/client"
import { Request, Response } from "express"
import { z } from "zod"

interface User {
    email: string,
    password: string,
}

const UserSchema = z.object({
    email: z.string().email().max(150).trim(),
    password: z.string().max(150).trim().min(5),
})

export const createUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: User = UserSchema.parse(req.body)

        const emailExists = await prisma.user.findUnique({ where: { email } })
        if (emailExists) {
            res.status(400).json({ msg: "Email já cadastrado" })
            return
        }

        res.status(200).json({ msg: "Usuario criado com sucesso" })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }

}
