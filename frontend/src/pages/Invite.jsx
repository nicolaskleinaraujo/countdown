// Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Modules
import { useParams } from "react-router-dom"

const Invite = () => {
    const { token } = useParams()

    return (
        <div className="flex flex-col justify-center items-center bg-bgcolor w-screen min-h-screen">
            <Card className="w-10/12 text-center">
                <CardHeader>
                    <CardTitle>Você foi convidado(a) para uma Page</CardTitle>
                </CardHeader>

                <CardContent>
                    <p>Apenas aceite convites de pessoas confiaveis</p>
                </CardContent>

                <CardFooter className="flex flex-row justify-center items-center">
                    <Button className="mr-5">Aceitar</Button>
                    <Button variant="destructive">Recusar</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Invite