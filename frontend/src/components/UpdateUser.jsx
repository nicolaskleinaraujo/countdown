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

const UpdateUser = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { userId } = useContext(UserContext)

    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [nickname, setNickname] = useState("")

    const handleUpdate = async() => {
        console.log("Updated")
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* TODO add zod validation */}
                <DialogTrigger asChild>
                    <Button variant="destructive">Mudar Informações</Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Mudar Informações</DialogTitle>
                        <DialogDescription>Deseja mesmo mudar as informações da sua conta?</DialogDescription>
                    </DialogHeader>

                    <Input type="text" placeholder="Senha Atual" onChange={(e) => setOldPassword(e.target.value)} />
                    <Input type="text" placeholder="Nova Senha" onChange={(e) => setPassword(e.target.value)} />
                    <Input type="text" placeholder="Nickname" onChange={(e) => setNickname(e.target.value)} />

                    {!loading ? (
                        <Button variant="destructive" onClick={handleUpdate}>Atualizar</Button>
                    ) : (
                        <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateUser
