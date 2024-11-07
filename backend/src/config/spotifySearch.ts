import axios from "axios"

interface ISpotifyRes {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
}

const spotifySearch = async(q: string, token: string): Promise<ISpotifyRes> => {
    const spotifyRes = await axios.get(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=5`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return spotifyRes.data
}

export default spotifySearch
