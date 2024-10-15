import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import DatePicker from "./DatePicker"

const NewEvent = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mr-2">Novo evento</Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Novo evento</DialogTitle>
                    </DialogHeader>

                    <Input type="text" placeholder="Titulo" />
                    <DatePicker />

                    <DialogFooter>
                        <Button>Criar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewEvent
