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
import { useState, useContext } from "react"
import { UserContext } from "@/context/UserContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import dbFetch from "@/config/axios"

const NewPage = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { userId, userPages, setUserPages } = useContext(UserContext)
    const [title, setTitle] = useState("")
    const [image, setImage] = useState()

    const handleCreate = async() => {
        setLoading(true)

        try {
            const formData = new FormData()

            formData.append("title", title)
            formData.append("image", image)

            const res = await dbFetch.post("/pages", formData, { 
                headers: { "userId": userId },
            })

            setUserPages([...userPages, res.data.page])

            toast.success(res.data.msg)
            setIsOpen(false)
            setLoading(false)

            navigate(`/pages/${res.data.page.id}`)
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* TODO add zod form */}
                <DialogTrigger asChild>
                    { userId !== 0 ? (
                        <Button>Nova <span className="animate-pulse text-purple-400 ml-1">Page</span></Button>
                    ) : (
                        <Button>Crie sua <span className="animate-pulse text-purple-400 ml-1">Page</span></Button>
                    )}
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Nova <span className="animate-pulse text-purple-400 ml-1">Page</span></DialogTitle>

                        <DialogDescription>
                            Digite as informações da nova <span className="animate-pulse text-purple-400 ml-1">Page</span>
                        </DialogDescription>
                    </DialogHeader>

                    <Input type="text" placeholder="Titulo" onChange={(e) => setTitle(e.target.value)} />
                    <Input id="picture" onChange={(e) => setImage(e.target.files[0])} type="file" />

                    <DialogFooter>
                        {!loading ? (
                            <Button onClick={handleCreate}>Criar</Button>
                        ) : (
                            <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewPage
