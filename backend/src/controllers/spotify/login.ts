import { Request, Response } from "express"
import querystring from "node:querystring"

export const login = (req: Request, res: Response): void => {
    const query: string = querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        redirect_uri: `${process.env.ORIGIN_URL}/spotify/callback`,
    })

    res.status(202).json({ spotifyUri: `https://accounts.spotify.com/authorize?${query}` })
}
