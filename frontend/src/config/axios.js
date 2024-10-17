import axios from "axios"

axios.defaults.withCredentials = true
const dbFetch = axios.create({
    baseURL: process.env.VITE_API_URL,
})

export default dbFetch
