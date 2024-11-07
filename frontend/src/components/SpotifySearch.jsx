// Components
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Modules
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/UserContext"
import dbFetch from "@/config/axios"

const SpotifySearch = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [tracks, setTracks] = useState([])

    const { userId } = useContext(UserContext)

    const searchTracks = async() => {
        if (searchQuery === "") {
            return
        } 

        try {
            const res = await dbFetch.get(`/spotify/search?q=${searchQuery}`, {
                headers: { "userId": userId },
            })

            setTracks(res.data.tracks.tracks.items)
        } catch (error) {
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
            <div className="flex justify-center items-center relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-bgcolor3" />

                <Input
                    type="search"
                    placeholder="Pesquisar musica"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 mb-2 shadow-lg shadow-bgcolor3"
                />
            </div>

            <div>
                {searchQuery && (
                    <Card>
                        <CardContent className="p-0">
                            {tracks.length > 0 ? (
                                <ul className="divide-y">
                                    {tracks.map(track => (
                                        <li key={track.id} className="px-4 py-2 ease-in-out hover:bg-bgcolor3">
                                            <button onClick={() => changePageMusic(track.id)}>
                                                {`${track.name} - ${track.artists[0].name}`}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="p-4 text-center text-muted-foreground">Nenhuma musica encontrada</p>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default SpotifySearch