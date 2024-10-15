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

const EditEvent = () => {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState(Date)

    const handleEdit = () => {
        console.log(title, date)
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mr-2">Editar</Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Editar evento</DialogTitle>
                        <DialogDescription>Edite as informações do evento</DialogDescription>
                    </DialogHeader>

                    <Input type="text" placeholder="Titulo" onChange={(e) => setTitle(e.target.value)} />
                    <DatePicker date={date} setDate={setDate} />

                    <DialogFooter>
                        <Button onClick={handleEdit}>Editar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditEvent
