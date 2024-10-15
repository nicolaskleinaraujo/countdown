import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "./ui/button"

const NewEvent = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger>Novo evento</DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Novo evento</DialogTitle>
                    </DialogHeader>

                    <DialogFooter>
                        <Button>Criar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewEvent
