// Components
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import DeleteAccount from "@/components/DeleteAccount"
import UpdateUser from "@/components/UpdateUser"

// Modules
import dbFetch from "@/config/axios"
import { UserContext } from "@/context/UserContext"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const User = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { setUserId, setUserPages } = useContext(UserContext)

    const deAuth = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.get("/users/deauth")

            setUserId(0)
            setUserPages([])

            toast.success(res.data.msg)
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-12 bg-bgcolor min-h-[80vh]">
            <h2 className="text-textcolor font-bold text-2xl sm:text-3xl lg:text-4xl">Minha conta</h2>

            {!loading ? (
                <>
                    <UpdateUser />
                    <DeleteAccount />
                    <Button onClick={() => deAuth()} className="md:text-lg md:p-5">Sair</Button>
                </>
            ) : (
                <>
                    <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button>
                    <Button variant="destructive" disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button>
                    <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button>
                </>
            )}
        </div>
    )
}

export default User
