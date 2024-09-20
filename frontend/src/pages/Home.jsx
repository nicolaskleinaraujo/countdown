// Modules
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-3/6 bg-bgcolor">
                <h1 className="text-center m-10">NOSSO temporizador de eventos importantes!</h1>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Foto Casal</AvatarFallback>
                </Avatar>
                <Card>
                    <CardHeader>
                        <CardTitle>Viagem para Terra do Nunca</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Faltam XX dias</p>
                        <p>XX dias ja foram esperados</p>
                    </CardContent>
                    <CardFooter>
                        <p>19/09/24 - 16/01/25</p>
                    </CardFooter>
                </Card>
                <Button>Novo evento</Button>
                <Button>Editar eventos</Button>
            </div>
        </div>
    )
}

export default Home
