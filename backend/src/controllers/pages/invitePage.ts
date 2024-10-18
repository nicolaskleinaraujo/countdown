import { Request, Response } from "express"
import { prisma } from "../../db/client"
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken"
import { Pages } from "@prisma/client"

interface ImagesInfos {
    id: number
    filename: string
    content: string | Buffer
}

interface PagesInfos extends Pages {
    image: ImagesInfos,
}

interface jwtInfos extends JwtPayload {
    pageId: number,
}

export const invitePage = async(req: Request, res: Response): Promise<void> => {
    try {
        const invite: string = req.params.invite
        const userId: string | string[] | undefined = req.headers.userid

        const inviteJwt = jwt.verify(invite, process.env.JWT_SECRET as string) as jwtInfos

        const page: PagesInfos | null = await prisma.pages.findUnique({
            where: { id: inviteJwt.pageId },
            include: { Events: true, image: true },
        })

        if (!page) {
            res.status(404).json({ msg: "Página não encontrada" })
            return
        }

        await prisma.pages.update({
            where: { id: inviteJwt.pageId },
            data: {
                users: { connect: { id: Number(userId) } },
            },
        })

        page.image.content = page.image.content.toString("base64")

        res.status(201).json({ msg: "Usuario adicionado ao page", page })
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.status(401).json({ msg: "Token expirado" })
            return
        }

        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}