// Components
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ConfirmDelete from "@/components/ConfirmDelete"
import EditEvent from "@/components/EditEvent"
import EditTitle from "@/components/EditTitle"
import UpdateImage from "@/components/UpdateImage"
import SpotifySearch from "@/components/SpotifySearch"

// Modules
import { Link, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { format, differenceInCalendarDays as diffDays } from "date-fns"

const Edit = () => {
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
            <div className="flex flex-col justify-center bg-bgcolor p-10 min-h-[80vh] w-full">
                <h1 className="text-center text-textcolor text-lg md:text-2xl lg:text-3xl">
                    {!loading ? title : <Skeleton className="h-6 w-56 mx-auto bg-neutral-800" /> }
                </h1>
                { !loading ? <EditTitle pageId={id} info={title} /> : <Skeleton className="h-6 w-24 bg-neutral-800 mx-auto mt-3 mb-10" /> }

                <SpotifySearch pageId={id} />

                <Avatar className="group mb-10 mx-auto w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                    {!loading ? <AvatarImage src={image} className="group-hover:blur-md ease-in-out duration-100"  /> : <Skeleton className="w-44 h-44 bg-neutral-800" />}

                    {!loading && (
                        <span className="flex opacity-0 absolute inset-0 group-hover:opacity-100 items-center justify-center ease-in-out duration-100">
                            <UpdateImage pageId={id} />
                        </span>
                    )}
                </Avatar>

                {!loading ? (
                    events.length !== 0 && events.map(event => (
                        <Card className="bg-bgcolor mb-10 mx-auto text-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl" key={event.id}>
                            <CardHeader>
                                <CardTitle className="text-textcolor md:text-xl lg:text-2xl">{event.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mb-6 md:text-xl lg:text-2xl">
                                <p className="text-textcolor">
                                    { diffDays(event.starts_at, Date.now()) < 0 ? (
                                        `Ocorreu a ${Math.abs(diffDays(event.starts_at, Date.now()))} dias atrás`
                                    ) : (
                                        `Faltam ${diffDays(event.starts_at, Date.now())} dias`
                                    )}
                                </p>

                                <p className="text-textcolor">
                                    { diffDays(event.starts_at, Date.now()) < 0 ? (
                                        `${(diffDays(event.starts_at, event.created_at) - diffDays(event.starts_at, Date.now())) - Math.abs(diffDays(event.starts_at, Date.now()))} dias foram esperados`
                                    ) : (
                                        `${diffDays(event.starts_at, event.created_at) - diffDays(event.starts_at, Date.now())} dias já foram esperados`
                                    )}
                                </p>
                            </CardContent>
                            <CardFooter className="justify-center md:text-xl lg:text-2xl">
                                <p className="text-textcolor">{format(event.created_at, "dd/MM/yy")} - {format(event.starts_at, "dd/MM/yy")}</p>
                            </CardFooter>

                            <div className="flex flex-row justify-center mb-6">
                                <EditEvent eventId={event.id} pageId={id} infos={event} />
                                <ConfirmDelete eventId={event.id} pageId={id} />
                            </div>
                        </Card>
                    ))
                ) : (
                    <Skeleton className="h-56 w-10/11 bg-neutral-800 mx-auto mb-10" />
                )}

                <div className="flex flex-row justify-center">
                    <Button asChild className="md:text-lg md:p-5">
                        <Link to={`/pages/${id}`}>Voltar</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Edit
