// Components
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NewEvent from "@/components/NewEvent"

// Modules
import { Link, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { Skeleton } from "@/components/ui/skeleton"

const Page = () => {
    const { id } = useParams()
    const { userPages } = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [events, setEvents] = useState([])

    const getPage = async() => {
        setLoading(true)

        if (userPages.length !== 0) {
            const currentPage = userPages.filter(page => page.id == id)[0]

            setTitle(currentPage.title)
            setImage(`data:image/png;base64,${currentPage.image.content}`)
            setEvents(currentPage.events)

            //setLoading(false)
        }
    }

    useEffect(() => {
        getPage()
    }, [userPages])

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-bgcolor p-10 w-screen">
                <h1 className="text-center mb-10 text-textcolor">{!loading ? title : <Skeleton className="h-6 w-56 mx-auto bg-neutral-800" /> }</h1>

                <Avatar className="mb-10 mx-auto w-44 h-44">
                    {!loading ? <AvatarImage src={image} /> : <Skeleton className="w-44 h-44 bg-neutral-800" />}
                </Avatar>

                {!loading ? (
                    <Card className="bg-bgcolor mb-10 text-center">
                        <CardHeader>
                            <CardTitle className="text-textcolor">Viagem para Terra do Nunca</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mb-6">
                            <p className="text-textcolor">Faltam XX dias</p>
                            <p className="text-textcolor">XX dias ja foram esperados</p>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <p className="text-textcolor">19/09/24 - 16/01/25</p>
                        </CardFooter>
                    </Card>
                ) : (
                    <Skeleton className="h-56 w-10/11 bg-neutral-800 mx-auto mb-10" />
                )}

                <div className="flex flex-row justify-center">
                    {!loading ? (
                        <>
                            <NewEvent />

                            <Button asChild>
                                <Link to={"/edit"}>Editar página</Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Skeleton className="h-8 w-24 bg-neutral-800 mx-auto" />
                            <Skeleton className="h-8 w-24 bg-neutral-800 mx-auto" />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page
