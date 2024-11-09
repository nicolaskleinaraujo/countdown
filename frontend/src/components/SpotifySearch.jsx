// Components
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Modules
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { toast } from "react-toastify"
import dbFetch from "@/config/axios"

const SpotifySearch = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [tracks, setTracks] = useState([])

    const [focus, setFocus] = useState(false)
    const [loading, setLoading] = useState(true)

    const { userId, spotifySync, setSpotifySync } = useContext(UserContext)

    const searchTracks = async() => {
        if (searchQuery === "") {
            return
        } 

        try {
            const res = await dbFetch.get(`/spotify/search?q=${searchQuery}`, {
                headers: { "userId": userId },
            })

            setTracks(res.data.tracks.tracks.items)
            setLoading(false)
        } catch (error) {
            if (error.response.data.error.message === "Request failed with status code 401") {
                requestNewAccess()
                return
            }

            toast.error("Erro interno, tente novamente")
        }
    }

    const requestNewAccess = async() => {
        try {
            setLoading(true)

            await dbFetch.post("/spotify/refresh", {}, {
                headers: { "userId": userId },
            })

            searchTracks()
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const changePageMusic = async(id) => {
        console.log("Changed to " + id)
    }

    useEffect(() => {
        searchTracks()
    }, [searchQuery])

    return (
        <div className="w-64 mx-auto mb-10">
            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-bgcolor3" />

                <Input
                    type="search"
                    placeholder="Pesquisar no Spotify"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onMouseEnter={() => setFocus(true)} 
                    onMouseLeave={() => setFocus(false)} 
                    className="pl-8 mb-3 shadow-lg shadow-bgcolor3" 
                />
            </div>

            <div>
                {searchQuery && focus && (
                    <Card>
                        <CardContent className="p-0">
                            { loading && <Skeleton className="h-72 w-64 mx-auto bg-neutral-800" /> }

                            {!loading && tracks.length > 0 && (
                                <ul className="divide-y">
                                    {tracks.map(track => (
                                        <li key={track.id} className="px-4 py-2 ease-in-out">
                                            <button onClick={() => changePageMusic(track.id)} className="text-left">
                                                {`${track.name} - ${track.artists[0].name}`}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default SpotifySearch
