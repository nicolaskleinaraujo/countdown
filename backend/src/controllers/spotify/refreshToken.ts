import { Request, Response } from "express"
import spotifyRefreshToken from "../../config/spotifyRefreshToken"

export const refreshToken = async(req: Request, res: Response): Promise<void> => {
    try {
        const { spotifyRefresh } = req.signedCookies

        if (spotifyRefresh === undefined) {
            res.status(401).json({ msg: "Você não tem os tokens do Spotify" })
            return
        }

        const response = await spotifyRefreshToken(spotifyRefresh)

        res.cookie("spotifyAccess", response.access_token, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
        })

        res.status(200).json({ msg: "Access Token atualizado" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}
