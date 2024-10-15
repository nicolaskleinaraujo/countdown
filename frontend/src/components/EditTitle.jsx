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

const EditTitle = () => {
    const [title, setTitle] = useState("")

    const handleUpdate = () => {
        console.log(title)
    }

    return (
        <div className="flex justify-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="text-textcolor mb-10" variant="link">Editar</Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Editar titulo</DialogTitle>
                        <DialogDescription>Digite o novo titulo</DialogDescription>
                    </DialogHeader>

                    <Input type="text" placeholder="Titulo" onChange={(e) => setTitle(e.target.value)} />

                    <DialogFooter>
                        <Button onClick={handleUpdate}>Atualizar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditTitle
