// Components
import { Button } from "./ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
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

const DeleteAccount = () => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async() => {
        setLoading(true)

        try {
            console.log("Deleted")
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="destructive">Deletar conta</Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Excluir conta</DialogTitle>
                        <DialogDescription>Deseja mesmo excluir a sua conta? Isto é irreversível!</DialogDescription>
                    </DialogHeader>

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