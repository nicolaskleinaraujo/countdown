// Components
import DatePicker from "./DatePicker"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
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
import { useState } from "react"

const NewEvent = () => {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState(Date)

    const handleCreate = () => {
        console.log(title, date)
    }

    return (
        <div>
            <Dialog>
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
                        <Button onClick={ handleCreate }>Criar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewEvent
