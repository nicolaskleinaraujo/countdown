import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { prisma } from "../db/client"

interface jwtInfos extends JwtPayload {
    id: number,
}

export const validateToken = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId: string | string[] | undefined = req.headers.userid

    if (userId === undefined) {
        res.status(401).json({ msg: "Informações insuficientes" })
        return
    }

    const user = await prisma.user.findUnique({ where: { id: Number(userId) } })
    if (!user) {
        res.status(400).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    // Validating the refresh token
    const refreshToken = req.signedCookies.refresh
    if (!refreshToken) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    try {
        const refreshJwt = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as jwtInfos

        if (refreshJwt.id != Number(userId)) {
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

        if (accessJwt.id != Number(userId)) {
            res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
            return
        }
    } catch {
        const newAccessToken: string = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: "1h" })

        res.cookie("access", newAccessToken, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
        })
    }

    next()
}
