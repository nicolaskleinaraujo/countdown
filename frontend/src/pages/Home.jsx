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
        <div className="flex flex-col justify-center bg-bgcolor min-h-[80vh]">
            { userPages.length === 0 ? (
                <>
                    <div className="flex flex-col justify-center items-center text-textcolor text-center gap-8 mb-8 mx-5 sm:text-lg md:text-xl lg:text-2xl">
                        <h1 className="font-bold text-3xl animate-pulse text-purple-400 md:text-4xl lg:text-5xl">Countdown</h1>
                        <h2>Bem-vindo(a) ao <span className="animate-pulse text-purple-400">Countdown!</span></h2>
                        <p>Crie uma <span className="animate-pulse text-purple-400">Page</span> personalizada e compartilhe com pessoas você que ama!</p>
                        <p>Adicione datas importantes para tornar esta espera especial</p>
                    </div>

                    <div className="flex justify-center items-center">
                        { userId !== 0 ? (
                            <NewPage />
                        ) : (
                            <Button asChild>
                                <Link to={"/register"} className="md:text-lg md:p-5 md:my-3">Crie sua conta</Link>
                            </Button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h1 className="font-bold text-3xl animate-pulse text-purple-400 text-center my-8 md:text-4xl lg:text-5xl">Countdown</h1>

                    { userPages.map(page => (
                        <Link to={`/pages/${page.id}`} key={page.id}>
                            <Card className="flex flex-col justify-center items-center mx-auto mb-5 p-2 text-center shadow-2xl shadow-bgcolor2 w-full max-w-72 sm:max-w-md md:max-w-lg lg:max-w-xl">
                                <Avatar className="mx-auto w-28 h-28 border-2 border-bgcolor mt-3 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52">
                                    <AvatarImage src={`data:image/png;base64,${page.image.content}`} />
                                    <AvatarFallback>Imagem da Page</AvatarFallback>
                                </Avatar>

                                <CardHeader>
                                    <CardTitle className="font-semibold md:text-xl lg:text-2xl">{page.title}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}

                    <div className="flex justify-center items-center mb-5">
                        <NewPage />
                    </div>
                </>
            )}
        </div>
    )
}

export default Home
