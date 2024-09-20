// Modules
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const Home = () => {
    return (
        <div>
            <h1>NOSSO temporizador de eventos importantes!</h1>

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
        </div>
    )
}

export default Home
