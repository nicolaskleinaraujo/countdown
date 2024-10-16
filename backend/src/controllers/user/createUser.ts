import { prisma } from "../../db/client"
import { Request, Response } from "express"
import { string, z } from "zod"
import bcrypt from "bcryptjs"

interface User {
    email: string,
    password: string,
}

const UserSchema = z.object({
    email: z.string().email().trim().max(150),
    password: z.string().trim().min(5).max(150),
})

export const createUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: User = UserSchema.parse(req.body)

        const emailExists = await prisma.user.findUnique({ where: { email } })
        if (emailExists) {
            res.status(400).json({ msg: "Email já cadastrado" })
            return
        }

        const salt = await bcrypt.genSalt(10)
        const hash = bcrypt.hashSync(password, salt)

        const user = await prisma.user.create({
            data: {
                email,
                password: hash,
            }
        })

        res.status(200).json({ user, msg: "Usuario criado com sucesso" })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }

}
