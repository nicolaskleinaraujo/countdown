// Components
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NewEvent from "@/components/NewEvent"
import { Skeleton } from "@/components/ui/skeleton"
import { Share1Icon } from "@radix-ui/react-icons"

// Modules
import { Link, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { format, differenceInCalendarDays } from "date-fns"

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
            setEvents(currentPage.Events)

            setLoading(false)
        }
    }

    useEffect(() => {
        getPage()
    }, [userPages])

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-bgcolor p-10 w-screen min-h-screen">
                <h1 className="text-center mb-10 text-textcolor">{!loading ? title : <Skeleton className="h-6 w-56 mx-auto bg-neutral-800" /> }</h1>

                <Avatar className="mb-10 mx-auto w-44 h-44">
                    {!loading ? <AvatarImage src={image} /> : <Skeleton className="w-44 h-44 bg-neutral-800" />}
                </Avatar>

                {!loading ? (
                    events.length !== 0 && events.map(event => (
                        <Card className="bg-bgcolor mb-10 text-center" key={event.id}>
                            <CardHeader>
                                <CardTitle className="text-textcolor">{event.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mb-6">
                                <p className="text-textcolor">Faltam {differenceInCalendarDays(event.starts_at, Date.now())} dias</p>
                                <p className="text-textcolor">{differenceInCalendarDays(event.starts_at, event.created_at)} dias já foram esperados</p>
                            </CardContent>
                            <CardFooter className="justify-center">
                                <p className="text-textcolor">{format(event.created_at, "dd/MM/yy")} - {format(event.starts_at, "dd/MM/yy")}</p>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <Skeleton className="h-56 w-10/11 bg-neutral-800 mx-auto mb-10" />
                )}

                <div className="flex flex-col justify-center">
                    {!loading ? (
                        <>
                            <div className="flex flex-row mb-3 mx-auto">
                                <NewEvent pageId={id} />
                                <Button asChild>
                                    <Link to={`/edit/${id}`}>Editar página</Link>
                                </Button>
                            </div>

                            <Button className="mx-auto"><Share1Icon className="mr-2 h-4 w-4 align-middle" /> Convidar para Page</Button>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-row mb-3 mx-auto">
                                <Skeleton className="h-8 w-24 bg-neutral-800 mx-auto mr-3" />
                                <Skeleton className="h-8 w-24 bg-neutral-800 mx-auto" />
                            </div>

                            <Skeleton className="h-8 w-40 bg-neutral-800 mx-auto" />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page
