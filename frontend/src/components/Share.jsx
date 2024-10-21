// Components
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogClose, DialogFooter } from "@/components/ui/dialog"
import { CopyIcon, Share1Icon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Modules
import { useContext, useEffect, useState } from "react"
import dbFetch from "@/config/axios"
import { toast } from "react-toastify"
import { UserContext } from "@/context/UserContext"

const Share = ({ pageId }) => {
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

    const { userId } = useContext(UserContext)
    const [link, setLink] = useState("")

    const createLink = async() => {
        try {
            const res = await dbFetch.post("/pages/invite", {
                pageId: parseInt(pageId)
            }, { headers: { "userId": userId } })

            setLink(`${import.meta.env.VITE_FRONTEND_URL}/invite/${res.data.inviteToken}`)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
            setIsOpen(false)
        }
    }

    const handleClipboard = () => {
        try {
            if (!loading) {
                navigator.clipboard.writeText(link)
                toast.success("Copiado")
            }
        } catch (error) {
            toast.error("Falha ao copiar")
        }
    }

    useEffect(() => {
        if (isOpen === true) {
            createLink()
        }
    }, [isOpen])

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Share1Icon className="mr-2 h-4 w-4 align-middle" /> 
                        Convidar para <span className="animate-pulse text-purple-400 ml-1">Page</span>
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                    {!loading ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Compartilhar link</DialogTitle>
                                <DialogDescription>Qualquer pessoa com o link abaixo conseguira entrar na Page</DialogDescription>
                            </DialogHeader>

                            <div className="flex items-center space-x-2">
                                <Input className="grid flex-1 gap-2" readOnly value={link} />

                                <Button onClick={handleClipboard}>
                                    <CopyIcon className="h-4 w-4" />
                                </Button>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button">Fechar</Button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    ) : (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Share
