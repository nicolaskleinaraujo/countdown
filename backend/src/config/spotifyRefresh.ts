import axios from "axios"
import querystring from "node:querystring"

interface ISpotifyRes {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
}

const spotifyRefresh = async(token: string) => {
    const data: string = querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: token,
    })

    const spotifyRes = await axios.post("https://accounts.spotify.com/api/token", data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
        }
    })

    return spotifyRes.data
}

export default spotifyRefresh
