// Components
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"

const ConfirmDelete = ({ deleteFunc }) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive">Excluir</Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Excluir evento</DialogTitle>
                        <DialogDescription>Deseja mesmo excluir o evento selecionado?</DialogDescription>
                    </DialogHeader>

                    <Button variant="destructive" onClick={deleteFunc}>Excluir</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ConfirmDelete
