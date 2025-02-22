// Modules
import dbFetch from "../config/axios"
import { useEffect, useState, useContext } from 'react'
import { UserContext } from "../context/UserContext"

const useAuth = () => {
    const { setUserId, setUserPages } = useContext(UserContext)

    const [authUserId, setAuthUserId] = useState(0)
    const [loading, setLoading] = useState(true)

    const fetchData = async() => {
        try {
            const res = await dbFetch.post("/users/tryauth")

            setUserId(res.data.user.id)
            setUserPages(res.data.user.pages)

            setAuthUserId(res.data.user.id)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { authUserId, loading }
}

export default useAuth
