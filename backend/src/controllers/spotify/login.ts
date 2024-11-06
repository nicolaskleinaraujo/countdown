import { Request, Response } from "express"
import querystring from "node:querystring"

export const login = async(req: Request, res: Response) => {
    const query = querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        redirect_uri: "http://localhost:5173",
    })

    res.status(202).json({ spotifyUri: `https://accounts.spotify.com/authorize?${query}` })
}
