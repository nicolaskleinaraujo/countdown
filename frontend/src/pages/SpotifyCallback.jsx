// Modules
import dbFetch from "@/config/axios"
import { RedirectContext } from "@/context/RedirectContext"
import { UserContext } from "@/context/UserContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"

const SpotifyCallback = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const [getRedirect, setGetRedirect] = useState("")
    const { setSpotifySync } = useContext(UserContext)

    const saveRedirect = () => {
        
    }

    const getSpotifyTokens = async() => {
        try {
            const res = await dbFetch.post(`/spotify/callback?code=${searchParams.get("code")}`)

            toast.success(res.data.msg)
            setSpotifySync(true)

            const redirect = sessionStorage.getItem("spotifyCallbackPage")
            if (redirect !== null) {
                navigate(redirect)
            } else if (redirect === null) (
                navigate("/")
            )
        } catch (error) {
            toast.error("Erro interno, tente novamente")
            navigate("/")
        }
    }

    useEffect(() => {
        saveRedirect()
        getSpotifyTokens()
    }, [])

    return (
        <div className="flex flex-col gap-14 justify-center items-center h-96 text-3xl text-center">
            <p>Fazendo o login no Spotify...</p>
            <p>Aguarde um momento</p>
        </div>
    )
}

export default SpotifyCallback
