import { Request, Response } from "express"
import z from "zod"
import spotifyToken from "../../config/spotifyToken"

interface Info {
    code: string | null
}

const InfoSchema = z.object({
    code: z.string().trim(),
})

export const callback = async(req: Request, res: Response): Promise<void> => {
    try {
        const { code }: Info = InfoSchema.parse(req.query)

        const response = await spotifyToken(code)

        res.cookie("spotifyAccess", response.access_token, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
        })

        res.cookie("spotifyRefresh", response.refresh_token, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
        })

        res.status(200).json({ msg: "Spotify sincronizado" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}
