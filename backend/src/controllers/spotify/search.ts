import { Request, Response } from "express"
import z from "zod"
import spotifySearch from "../../config/spotifySearch"

interface Info {
    q: string | null
}

const InfoSchema = z.object({
    q: z.string().trim().max(200),
})

export const search = async(req: Request, res: Response): Promise<void> => {
    try {
        const { q }: Info = InfoSchema.parse(req.query)
        const spotifyAccess = req.signedCookies.spotifyAccess

        const response = await spotifySearch(q, spotifyAccess)

        res.status(200).json({ msg: "Pesquisa feita com sucesso", tracks: response })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}
