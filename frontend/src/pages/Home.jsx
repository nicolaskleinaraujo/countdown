// Components
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import NewPage from "@/components/NewPage"

// Modules
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"
import { Link } from "react-router-dom"

const Home = () => {
    const { userId, userPages } = useContext(UserContext)

    return (
        <div className="flex flex-col justify-center bg-bgcolor min-h-96">
            { userPages.length === 0 ? (
                <>
                    <div className="flex flex-col justify-center items-center text-textcolor text-center gap-5 mb-5 mx-5">
                        <h1 className="font-bold text-3xl animate-pulse text-purple-400">Countdown</h1>
                        <h2>Bem-vindo(a) ao <span className="animate-pulse text-purple-400">Countdown!</span></h2>
                        <p>Crie uma <span className="animate-pulse text-purple-400">Page</span> personalizada e compartilhe com pessoas você que ama!</p>
                        <p>Adicione datas importantes para tornar esta espera especial</p>
                    </div>

                    <div className="flex justify-center items-center">
                        { userId !== 0 ? (
                            <NewPage />
                        ) : (
                            <Button asChild>
                                <Link to={"/register"}>Crie sua conta</Link>
                            </Button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h1 className="font-bold text-3xl animate-pulse text-purple-400 text-center my-5">Countdown</h1>

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
                        <NewPage />
                    </div>
                </>
            )}
        </div>
    )
}

export default Home
