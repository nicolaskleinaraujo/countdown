// Modules
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom" 
import NewEvent from "@/components/NewEvent"

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-bgcolor p-10">
                <h1 className="text-center mb-10 text-textcolor">NOSSO temporizador de eventos importantes!!</h1>

                <Avatar className="mb-10 mx-auto w-44 h-44">
                    <AvatarImage src="https://github.com/nicolaskleinaraujo.png" />
                    <AvatarFallback>Foto</AvatarFallback>
                </Avatar>

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
                    <NewEvent />

                    <Button asChild>
                        <Link to={"/edit"}>Editar página</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home
