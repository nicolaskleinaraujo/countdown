// Components
import { Button } from "./ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Input } from "./ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"

// Modules
import dbFetch from "@/config/axios"
import { UserContext } from "@/context/UserContext"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const DeleteAccount = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { userId, setUserId, setUserPages } = useContext(UserContext)
    const [password, setPassword] = useState("")

    const handleDelete = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.delete("/users", {
                headers: { "userId": userId },
                data: { password: password },
            })

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
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* TODO add zod validation */}
                <DialogTrigger asChild>
                    <Button variant="destructive">Deletar conta</Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Excluir conta</DialogTitle>
                        <DialogDescription>Deseja mesmo excluir a sua conta? Esta ação é irreversível!</DialogDescription>
                    </DialogHeader>

                    <Input type="text" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />

                    {!loading ? (
                        <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
                    ) : (
                        <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DeleteAccount