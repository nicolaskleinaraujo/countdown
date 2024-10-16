import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

interface jwtInfos extends JwtPayload {
    id: string,
}

export const validateToken = async(req: Request, res: Response, next: NextFunction) => {
    const userId: string | string[] | undefined = req.headers.userId

    if (userId === undefined) {
        res.clearCookie
        res.status(401).json({ msg: "Informações insuficientes" })
        return
    }

    const accessToken: string = req.signedCookies.access
    if (!accessToken) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    try {
        const accessJwt = jwt.verify(accessToken, process.env.JWT_SECRET as string) as jwtInfos

        if (accessJwt.id !== userId) {
            res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
            return
        }
    } catch { return }

    const refreshToken = req.signedCookies.refresh
    if (!refreshToken) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    try {
        const refreshJwt = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as jwtInfos

        if (refreshJwt.id !== userId) {
            res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
            return
        }
    } catch (error) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    const newAccessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: "1h" })

    res.cookie("access", newAccessToken, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 60 * 60 * 1000,
    })

    next()
}
