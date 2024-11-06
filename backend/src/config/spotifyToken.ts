import axios from "axios"
import querystring from "node:querystring"

interface ISpotifyRes {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
}

const spotifyToken = async(code: string): Promise<ISpotifyRes> => {
    const data: string = querystring.stringify({
        code: code,
        redirect_uri: process.env.ORIGIN_URL,
        grant_type: "authorization_code"
    })

    const spotifyRes = await axios.post("https://accounts.spotify.com/api/token", data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
        }
    })

    return spotifyRes.data
}

export default spotifyToken
