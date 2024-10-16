import { Request, Response } from "express"
import { prisma } from "../../db/client"
import { z } from "zod"
import bcrypt from "bcryptjs"

interface Infos {
    id: number,
    password: string,
}

const InfosSchema = z.object({
    id: z.number().max(10),
    password: z.string().trim().min(5).max(150),
})

export const deleteUser = async(req: Request, res:Response): Promise<void> => {
    try {
        const { id, password }: Infos = InfosSchema.parse(req.body)

        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            res.status(404).json({ msg: "Usuario não encontrado" })
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            res.status(400).json({ msg: "Senha incorreta" })
            return
        }

        await prisma.user.delete({ where: { id } })

        res.status(200).json({ msg: "Usuario deletado com sucesso" })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = error.issues.flatMap(issue => issue.path.map(path => path))
            res.status(400).json(fields)
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}
