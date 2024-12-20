import { prisma } from "../../db/client"
import { Request, Response } from "express"
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

interface User {
    email: string,
    password: string,
    nickname: string,
}

const UserSchema = z.object({
    email: z.string().email().trim().max(150),
    password: z.string().trim().min(5).max(150),
    nickname: z.string().trim().min(3).max(15),
})

export const createUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, nickname }: User = UserSchema.parse(req.body)

        const emailExists = await prisma.user.findUnique({ where: { email } })
        if (emailExists) {
            res.status(400).json({ msg: "Email já cadastrado" })
            return
        }

        // Creates the hashed password
        const salt = await bcrypt.genSalt(10)
        const hash = bcrypt.hashSync(password, salt)

        const user = await prisma.user.create({
            data: {
                email,
                password: hash,
                nickname,
            }
        })
        user.password = ""

        // Creating the access and refresh JWT Token
        const accessToken: string = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" })
        const refreshToken: string = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "60d" })

        res.cookie("access", accessToken, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
        })

        res.cookie("refresh", refreshToken, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
        })

        res.status(201).json({ user, msg: "Usuario criado com sucesso" })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}
