import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { prisma } from "../../db/client"
import { User } from "@prisma/client"

interface jwtInfos extends JwtPayload {
    id: number,
}

export const tryAuth = async(req: Request, res: Response): Promise<void> => {
    let user: User | null

    // Validating the refresh token
    const refreshToken = req.signedCookies.refresh
    if (!refreshToken) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    try {
        const refreshJwt = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as jwtInfos

        user = await prisma.user.findUnique({ where: { id: refreshJwt.id } })
        if (user === null) {
            res.status(400).json({ msg: "Sessão expirada, faça o login novamente" })
            return
        }

        if (refreshJwt.id != user.id) {
            res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
            return
        }
    } catch (error) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    // Validating the access token
    const accessToken: string = req.signedCookies.access
    if (!accessToken) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    try {
        const accessJwt = jwt.verify(accessToken, process.env.JWT_SECRET as string) as jwtInfos

        if (accessJwt.id != user.id) {
            res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
            return
        }
    } catch {
        const newAccessToken: string = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" })

        res.cookie("access", newAccessToken, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 60 * 60 * 1000,
        })
    }

    res.status(200).json({ msg: "Logado com sucesso", user })
}
