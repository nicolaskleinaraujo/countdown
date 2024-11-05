// Components
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

const EditTitle = ({ pageId, info }) => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { userId, userPages, setUserPages } = useContext(UserContext)
    const [title, setTitle] = useState(info)

    const handleUpdate = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.patch("/pages/title", {
                title,
                id: parseInt(pageId),
            }, { headers: { "userId": userId } })

            const page = userPages.filter(page => page.id == pageId)[0]
            page.title = res.data.updatedPage.title

            const updatedPages = userPages.filter(page => page.id != pageId)
            updatedPages.push(page)
            setUserPages(updatedPages)

            toast.success(res.data.msg)
            setIsOpen(false)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* TODO add zod validation */}
                <DialogTrigger asChild>
                    <Button className="text-textcolor mb-10 md:text-lg md:p-5" variant="link">Editar</Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Editar titulo</DialogTitle>
                        <DialogDescription>Digite o novo titulo</DialogDescription>
                    </DialogHeader>

                    <Input type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} />

                    <DialogFooter>
                        { !loading ? <Button onClick={handleUpdate}>Atualizar</Button> : <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button> }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditTitle
