// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Edit = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-bgcolor p-10">
                <h1 className="text-center mb-10 text-textcolor">Editar Página</h1>

                <div className="group">
                    <Avatar className="mb-10 mx-auto w-44 h-44">
                        <AvatarImage 
                            src="https://github.com/nicolaskleinaraujo.png" 
                            className="group-hover:blur-md ease-in-out duration-100" 
                        />
                        <AvatarFallback>Foto</AvatarFallback>

                        <span className="absolute inset-0 flex items-center justify-center">
                            <Input type="file" />
                        </span>
                    </Avatar>
                </div>

                <Card className="bg-bgcolor mb-10 text-center">
                    <CardHeader>
                        <CardTitle className="text-textcolor">Viagem para Terra do Nunca</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <p className="text-textcolor">Faltam XX dias</p>
                        <p className="text-textcolor">XX dias ja foram esperados</p>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <p className="text-textcolor">19/09/24 - 16/01/25</p>
                    </CardFooter>
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
