// Components
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Modules
import { useState } from "react"

const SpotifySearch = () => {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div>
            <div className="flex justify-center items-center relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-bgcolor3" />

                <Input
                    type="search"
                    placeholder="Pesquisar musica"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 mb-10 shadow-lg shadow-bgcolor3"
                />
            </div>
        </div>
    )
}

export default SpotifySearch
