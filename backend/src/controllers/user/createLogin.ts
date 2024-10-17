import { Request, Response } from "express"
import { prisma } from "../../db/client"
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Pages, User } from "@prisma/client"

interface ImagesInfos {
    id: number
    filename: string
    content: string | Buffer
}

interface PagesInfos extends Pages {
    image: ImagesInfos,
}

interface UserInfos extends User {
    pages: PagesInfos[],
}

interface Infos {
    email: string,
    password: string,
}

const InfosSchema = z.object({
    email: z.string().email().trim().max(150),
    password: z.string().trim().min(5).max(150),
})

export const createLogin = async(req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: Infos = InfosSchema.parse(req.body)

        const user: UserInfos | null = await prisma.user.findUnique({ 
            where: { email }, 
            include: { 
                pages: { 
                    include: { image: true } 
                } 
            } 
        })

        if (!user) {
            res.status(404).json({ msg: "Usuario não encontrado" })
            return
        }

        const checkPassword: boolean = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            res.status(400).json({ msg: "Senha incorreta" })
            return
        }
        user.password = ""

        // Creating the access and refresh token
        const accessToken: string = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" })
        const refreshToken: string = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "60d" })

        res.cookie("access", accessToken, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 60 * 60 * 1000,
        })

        res.cookie("refresh", refreshToken, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 24 * 60 * 60 * 1000,
        })

        // Convert pages images to base64
        user.pages.forEach(page => page.image.content = page.image.content.toString("base64"))

        res.status(200).json({ user, msg: "Login feito com sucesso" })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}