// Modules
import dbFetch from "@/config/axios"
import { RedirectContext } from "@/context/RedirectContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"

const SpotifyCallback = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const [getRedirect, setGetRedirect] = useState("")
    const { redirect, setRedirect } = useContext(RedirectContext)

    const saveRedirect = () => {
        if (redirect !== "") {
            setGetRedirect(redirect)
            setRedirect("")
        }
    }

    const getSpotifyTokens = async() => {
        try {
            const res = await dbFetch.post(`/spotify/callback?code=${searchParams.get("code")}`)

            toast.success(res.data.msg)
            navigate(getRedirect)
        } catch (error) {
            console.log(error)
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
