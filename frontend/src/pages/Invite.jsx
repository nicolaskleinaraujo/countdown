// Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ReloadIcon } from "@radix-ui/react-icons"

// Modules
import { useContext, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { UserContext } from "@/context/UserContext"
import { RedirectContext } from "@/context/RedirectContext"
import dbFetch from "@/config/axios"

const Invite = () => {
    const { token } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { userId, userPages, setUserPages } = useContext(UserContext)
    const { setRedirect } = useContext(RedirectContext)

    const handleInvite = async() => {
        if (userId === 0) {
            setRedirect(`/invite/${token}`)
            navigate("/login")
        }

        setLoading(true)

        try {
            const res = await dbFetch.get(`/pages/invite/${token}`, {
                headers: { "userId": userId }
            })

            setUserPages([...userPages, res.data.page])

            navigate(`/pages/${res.data.page.id}`)
        } catch (error) {
            toast.error(error.response.data.msg)
            navigate("/")
        }
    }

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
                    {!loading ? (
                        <>
                            <Button onClick={handleInvite} className="mr-5">Aceitar</Button>

                            <Button variant="destructive" asChild>
                                <Link to={"/"}>Recusar</Link>
                            </Button>
                        </>
                    ) : (
                        <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Carregando</Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

export default Invite