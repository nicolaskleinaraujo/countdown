// Components
import { Button } from "@/components/ui/button"

// Modules
import dbFetch from "@/config/axios"
import { UserContext } from "@/context/UserContext"
import { useContext, useState } from "react"
import { toast } from "react-toastify"

const User = () => {
    const [loading, setLoading] = useState(false)

    const { setUserId } = useContext(UserContext)

    const deAuth = async() => {
        setLoading(true)

        try {
            console.log("Logged out")
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-12 bg-bgcolor min-h-96">
            <h2 className="text-textcolor font-bold text-2xl">Minha conta</h2>

            <Button>Mudar Informações</Button>
            <Button variant="destructive">Deletar Conta</Button>
            <Button onClick={() => deAuth()}>Sair</Button>
        </div>
    )
}

export default User
