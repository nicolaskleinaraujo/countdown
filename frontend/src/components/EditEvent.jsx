// Components
import DatePicker from "./DatePicker"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ReloadIcon } from "@radix-ui/react-icons"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"

// Modules
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import dbFetch from "@/config/axios"
import { UserContext } from "@/context/UserContext"

const EditEvent = ({ eventId, pageId, infos }) => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { userId, userPages, setUserPages } = useContext(UserContext)
    const [title, setTitle] = useState(infos.title)
    const [date, setDate] = useState(infos.starts_at)

    const handleEdit = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.patch("/pages/event", {
                title,
                starts_at: new Date(date).toISOString(),
                id: parseInt(eventId),
            }, { headers: { "userId": userId }  })

            const page = userPages.filter(page => page.id == pageId)[0]
            const eventIndex = page.Events.findIndex(event => event.id == eventId)
            page.Events[eventIndex] = res.data.updatedEvent

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
                {/* TODO add zod validation */}
                <DialogTrigger asChild>
                    <Button className="mr-2 md:text-lg md:p-5 md:mr-4">Editar</Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Editar evento</DialogTitle>
                        <DialogDescription>Edite as informações do evento</DialogDescription>
                    </DialogHeader>

                    <Input type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <DatePicker date={date} setDate={setDate} />

                    <DialogFooter>
                        {!loading ? <Button onClick={handleEdit}>Editar</Button> : <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button>}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditEvent
