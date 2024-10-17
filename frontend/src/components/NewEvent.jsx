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
import { useState, useContext } from "react"
import { UserContext } from "@/context/UserContext"
import dbFetch from "@/config/axios"

const NewEvent = ({ pageId }) => {
    const [loading, setLoading] = useState(false)
    const { userId } = useContext(UserContext)

    const [title, setTitle] = useState("")
    const [date, setDate] = useState(Date)

    const handleCreate = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.post("/pages/event", {
                title,
                starts_at: new Date(date).toISOString(),
                pageId: parseInt(pageId),
            }, { headers: { "userId": userId } })

            console.log(res.data)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog>
                {/* TODO add zod form */}
                <DialogTrigger asChild>
                    <Button className="mr-2">Novo evento</Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Novo evento</DialogTitle>
                        <DialogDescription>Digite as informações do novo evento</DialogDescription>
                    </DialogHeader>

                    <Input type="text" placeholder="Titulo" onChange={(e) => setTitle(e.target.value)} />
                    <DatePicker date={date} setDate={setDate} />

                    <DialogFooter>
                        {!loading ? <Button onClick={handleCreate}>Criar</Button> : <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button>}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewEvent
