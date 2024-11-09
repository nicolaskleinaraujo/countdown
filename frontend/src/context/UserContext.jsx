// Modules
import { createContext, useState } from "react"

// Context
export const UserContext = createContext()

// Provider
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(0)
    const [userPages, setUserPages] = useState([])
    const [spotifySync, setSpotifySync] = useState(false)

    return (
        <UserContext.Provider value={{ userId, setUserId, userPages, setUserPages, spotifySync, setSpotifySync }}>
            {children}
        </UserContext.Provider>
    )
}
