// Modules
import { createContext, useState } from "react"

// Context
export const UserContext = createContext()

// Provider
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(0)
    const [userPages, setUserPages] = useState([])

    return (
        <UserContext.Provider value={{ userId, setUserId, userPages, setUserPages }}>
            {children}
        </UserContext.Provider>
    )
}
