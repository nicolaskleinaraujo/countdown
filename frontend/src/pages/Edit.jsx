// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
import ConfirmDelete from "@/components/ConfirmDelete"
import EditEvent from "@/components/EditEvent"
import EditTitle from "@/components/EditTitle"

// Modules
import { Link } from "react-router-dom"

const Edit = () => {
    const deleteEvent = () => {
        console.log("deletado")
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-bgcolor p-10">
                <h1 className="text-center text-textcolor">NOSSO temporizador de eventos importantes!!</h1>
                <EditTitle />

                <Avatar className="group mb-10 mx-auto w-44 h-44">
                    <AvatarImage 
                        src="https://github.com/nicolaskleinaraujo.png" 
                        className="group-hover:blur-md ease-in-out duration-100" 
                    />
                    <AvatarFallback>Foto</AvatarFallback>

                    <span className="flex opacity-0 absolute inset-0 group-hover:opacity-100 items-center justify-center ease-in-out duration-100">
                        <Label htmlFor="picture"><Pencil /></Label>
                        <Input id="picture" type="file" className="hidden" />
                    </span>
                </Avatar>

                <Card className="bg-bgcolor mb-10 text-center">
                    <CardHeader>
                        <CardTitle className="text-textcolor">Viagem para Terra do Nunca</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mb-6">
                        <p className="text-textcolor">Faltam XX dias</p>
                        <p className="text-textcolor">XX dias ja foram esperados</p>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <p className="text-textcolor">19/09/24 - 16/01/25</p>
                    </CardFooter>

                    <div className="flex flex-row justify-center mb-6">
                        <EditEvent />
                        <ConfirmDelete deleteFunc={deleteEvent} />
                    </div>
                </Card>

                <div className="flex flex-row justify-center">
                    <Button asChild>
                        <Link to={"/"}>Voltar</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Edit