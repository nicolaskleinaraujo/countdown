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
import { format, differenceInCalendarDays as diffDays } from "date-fns"
import Share from "@/components/Share"

const Page = () => {
    const { id } = useParams()
    const { userPages } = useContext(UserContext)

    const [loading, setLoading] = useState(false)
    const [musicLoading, setMusicLoading] = useState(true)

    const [title, setTitle] = useState("")
    const [music, setMusic] = useState("")
    const [image, setImage] = useState("")
    const [events, setEvents] = useState([])

    const getPage = async() => {
        setLoading(true)

        if (userPages.length !== 0) {
            const currentPage = userPages.filter(page => page.id == id)[0]

            setTitle(currentPage.title)
            setMusic(currentPage.musicId)
            setImage(`data:image/png;base64,${currentPage.image.content}`)
            setEvents(currentPage.Events)

            setLoading(false)
        }
    }

    useEffect(() => {
        getPage()
    }, [userPages, id])

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center bg-bgcolor p-10 min-h-[80vh] w-full">
                <h1 className="text-center mb-10 font-bold text-lg animate-pulse text-purple-400 md:text-2xl lg:text-3xl">
                    {!loading ? title : <Skeleton className="h-6 w-56 mx-auto bg-neutral-800" /> }
                </h1>

                { music != null && (
                    <iframe 
                        src={`https://open.spotify.com/embed/track/${music}?theme=0`} 
                        onLoad={() => setMusicLoading(false)} 
                        className={ 
                            musicLoading ? "hidden" : "block" && 
                            "h-20 mb-10 mx-auto rounded-2xl shadow-xl shadow-bgcolor3 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
                        }
                    ></iframe>
                )}

                <Avatar className="mb-10 mx-auto w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                    {!loading ? <AvatarImage src={image} /> : <Skeleton className="w-44 h-44 bg-neutral-800" />}
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
                            <CardFooter className="justify-center px-0 md:text-xl lg:text-2xl">
                                <p className="text-textcolor">{format(event.created_at, "dd/MM/yy")} - {format(event.starts_at, "dd/MM/yy")}</p>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <Skeleton className="h-56 w-10/11 bg-neutral-800 mx-auto mb-10" />
                )}

                <div className="flex flex-col justify-center items-center">
                    {!loading ? (
                        <>
                            <div className="flex flex-row mb-3 mx-auto">
                                <NewEvent pageId={id} />

                                <Button asChild className="ml-2 md:text-lg md:p-5">
                                    { events.length !== 0 && (
                                        <Link to={`/edit/${id}`}>Editar <span className="animate-pulse text-purple-400 ml-1">Page</span></Link>
                                    )}
                                </Button>
                            </div>

                            <Share pageId={id} />
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
