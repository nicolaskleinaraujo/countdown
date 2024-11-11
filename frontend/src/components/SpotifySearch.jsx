// Components
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

// Modules
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { toast } from "react-toastify"
import dbFetch from "@/config/axios"

const SpotifySearch = ({ pageId }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [tracks, setTracks] = useState([])

    const [loading, setLoading] = useState(false)
    const { userId, userPages, setUserPages, spotifySync, setSpotifySync } = useContext(UserContext)

    const handleSpotifyLogin = async() => {
        try {
            setLoading(true)

            const res = await dbFetch.post("/spotify/login", {}, {
                headers: { "userId": userId }
            })

            sessionStorage.setItem("spotifyCallbackPage", location.pathname)
            window.open(res.data.spotifyUri, "_self")
        } catch (error) {
            toast.error("Erro interno, tente novamente")
        }
    }

    const searchTracks = async() => {
        if (searchQuery === "") {
            return
        } 

        try {
            setLoading(true)

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
            setSpotifySync(false)
            setLoading(false)
        }
    }

    const changePageMusic = async(musicId) => {
        try {
            const res = await dbFetch.patch("/pages/music", {
                musicId: musicId,
                id: parseInt(pageId)
            }, { headers: { "userId": userId } })

            const updatedPages = userPages.filter(page => page.id != pageId)
            updatedPages.push(res.data.updatedPage)
            setUserPages(updatedPages)

            toast.success(res.data.msg)
        } catch (error) {
            toast.error("Erro interno, tente novamente")
        }
    }

    useEffect(() => {
        searchTracks()
    }, [searchQuery])

    return (
        <div className="mx-auto mb-10 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl md:text-xl lg:text-2xl text-textcolor">
            { !spotifySync && (
                <Card className="shadow-xl shadow-bgcolor3 text-center bg-bgcolor text-textcolor">
                    <CardHeader>
                        <CardTitle className="md:text-2xl lg:text-3xl text-textcolor">Faça login no <span className="text-bgcolor3">Spotify</span></CardTitle>
                    </CardHeader>

                    <CardContent className="p-3">
                        <CardDescription className="md:text-xl lg:text-2xl text-textcolor">Faça login no <span className="text-bgcolor3">Spotify</span> e escolha a musica perfeita para sua <span className="animate-pulse text-purple-400">Page</span></CardDescription>
                    </CardContent>

                    <CardFooter className="justify-center">
                        { !loading ? (
                            <Button onClick={() => handleSpotifyLogin()} variant="link" className="md:text-lg lg:text-xl text-textcolor">Login</Button>
                        ) : (
                            <Button disabled><ReloadIcon className="h-4 w-4 animate-spin" /></Button>
                        )}
                    </CardFooter>
                </Card>
            )}

            { spotifySync && (
                <>
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-bgcolor3 md:h-5 md:w-5 lg:top-3.5" />

                        <Input
                            type="search"
                            placeholder="Pesquisar no Spotify"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 mb-3 shadow-lg shadow-bgcolor3 md:text-lg md:py-5 lg:text-xl lg:py-6" 
                        />
                    </div>

                    <div>
                        {searchQuery && (
                            <Card>
                                <CardContent className="p-0">
                                    { loading && 
                                        <Skeleton className="h-72 mx-auto bg-neutral-800 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl" /> 
                                    }

                                    {!loading && tracks.length > 0 && (
                                        <ul className="divide-y text-textcolor">
                                            {tracks.map(track => (
                                                <li key={track.id} className="px-4 py-3 ease-in-out text-textcolor">
                                                    <button onClick={() => changePageMusic(track.id)} className="text-left text-textcolor">
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
                </>
            )}
        </div>
    )
}

export default SpotifySearch
