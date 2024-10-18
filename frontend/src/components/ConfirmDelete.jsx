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

const ConfirmDelete = ({ eventId, pageId }) => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { userId, userPages, setUserPages } = useContext(UserContext)

    const deleteEvent = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.delete("/pages/event", {
                headers: { "userId": userId },
                data: { "id": eventId },
            })

            let page = userPages.filter(page => page.id == pageId)[0]
            page.Events = page.Events.filter(event => event.id != eventId)

            const updatedPages = userPages.filter(page => page.id != pageId)
            updatedPages.push(page)
            setUserPages(updatedPages)

            toast.success(res.data.msg)
            setLoading(false)
            setIsOpen(false)
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="destructive">Excluir</Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Excluir evento</DialogTitle>
                        <DialogDescription>Deseja mesmo excluir o evento selecionado?</DialogDescription>
                    </DialogHeader>

                    {!loading ? <Button variant="destructive" onClick={deleteEvent}>Excluir</Button> : <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button>}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ConfirmDelete
