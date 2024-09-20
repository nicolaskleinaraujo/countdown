// Modules
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Home = () => {
    return (
        <div>
            <h1>NOSSO temporizador de eventos importantes!</h1>

            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Foto Casal</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default Home
