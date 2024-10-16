import { Request, Response } from "express"
import { prisma } from "../../db/client"
import { z } from "zod"
import bcrypt from "bcryptjs"

interface Infos {
    oldPassword: string,
    password: string,
    nickname: string,
}

const InfosSchema = z.object({
    oldPassword: z.string().trim().min(5).max(150),
    password: z.string().trim().min(5).max(150),
    nickname: z.string().trim().min(3).max(15),
})


export const updateUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const { oldPassword, password, nickname }: Infos = InfosSchema.parse(req.body)
        const userId: string | string[] | undefined = req.headers.userid

        if (userId === undefined) {
            res.status(401).json({ msg: "Informações insuficientes" })
            return
        }

        const user = await prisma.user.findUnique({ where: { id: Number(userId) } })
        if (!user) {
            res.status(404).json({ msg: "Usuario não encontrado" })
            return
        }

        const checkPassword: boolean = await bcrypt.compare(oldPassword, user.password)
        if (!checkPassword) {
            res.status(400).json({ msg: "Senha incorreta" })
            return
        }

        // Creates the hashed password
        const salt = await bcrypt.genSalt(10)
        const hash = bcrypt.hashSync(password, salt)

        const updatedUser = await prisma.user.update({ 
            where: { id: user.id }, 
            data: {
                password: hash,
                nickname,
            }, 
        })
        updatedUser.password = ""

        res.status(201).json({ msg: "Usuario atualizado com sucesso", updatedUser })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}