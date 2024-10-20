// Components
import { Button } from "@/components/ui/button"

// Modules

const User = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-10 bg-bgcolor min-h-96">
            <Button>Mudar Informações</Button>
            <Button variant="destructive">Deletar Conta</Button>
            <Button>Sair</Button>
        </div>
    )
}

export default User
