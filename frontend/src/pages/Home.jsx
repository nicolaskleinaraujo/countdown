// Components
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Modules
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Home = () => {
    const { userPages } = useContext(UserContext)

    return (
        <div className="flex flex-col bg-bgcolor h-screen pt-5">
            { userPages.length === 0 ? (
                <>
                    <p>Crie uma "Page" personalizada</p>
                </>
            ) : (
                <>
                    { userPages.map(page => (
                        <Link to={`/pages/${page.id}`} key={page.id}>
                            <Card className="text-cent mx-5 mb-5 p-2 text-center">
                                <Avatar className="mx-auto w-28 h-28 border-2 border-bgcolor">
                                    <AvatarImage src={`data:image/png;base64,${page.image.content}`} />
                                    <AvatarFallback>Imagem da Page</AvatarFallback>
                                </Avatar>

                                <CardHeader>
                                    <CardTitle>{page.title}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}

                    <div className="flex justify-center items-center">
                        <Button>Nova Page</Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Home
