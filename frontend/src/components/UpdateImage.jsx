// Components
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Pencil } from "lucide-react"

// Modules
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { UserContext } from "@/context/UserContext"
import dbFetch from "@/config/axios"

const UpdateImage = ({ pageId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const { userId, userPages, setUserPages } = useContext(UserContext)

    const handleImageUpdate = async(image) => {
        setLoading(true)

        try {
            const formData = new FormData()

            formData.append("id", pageId)
            formData.append("image", image)

            const res = await dbFetch.patch("/pages/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "userId": userId,
                },
            })

            setUserPages([userPages.filter(page => page.id != pageId), res.data.updatedPage])

            toast.success(res.data.msg)
            setIsOpen(false)
            setLoading(false)
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
                    <Pencil />
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Editar foto</DialogTitle>
                        <DialogDescription>Escolha a nova foto desejada</DialogDescription>
                    </DialogHeader>

                    {!loading ? (
                        <Input id="picture" onChange={(e) => handleImageUpdate(e.target.files[0])} type="file" />
                    ) : (
                        <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateImage
