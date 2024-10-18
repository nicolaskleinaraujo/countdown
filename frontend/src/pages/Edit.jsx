// Components
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import ConfirmDelete from "@/components/ConfirmDelete"
import EditEvent from "@/components/EditEvent"
import EditTitle from "@/components/EditTitle"

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
            <div className="bg-bgcolor p-10 w-screen min-h-screen">
                <h1 className="text-center text-textcolor">{!loading ? title : <Skeleton className="h-6 w-56 mx-auto bg-neutral-800" /> }</h1>
                { !loading ? <EditTitle pageId={id} info={title} /> : <Skeleton className="h-6 w-24 bg-neutral-800 mx-auto mt-3 mb-10" /> }

                <Avatar className="group mb-10 mx-auto w-44 h-44">
                    {!loading ? <AvatarImage src={image} className="group-hover:blur-md ease-in-out duration-100"  /> : <Skeleton className="w-44 h-44 bg-neutral-800" />}

                    {!loading && (
                        <span className="flex opacity-0 absolute inset-0 group-hover:opacity-100 items-center justify-center ease-in-out duration-100">
                            <Label htmlFor="picture"><Pencil /></Label>
                            <Input id="picture" type="file" className="hidden" />
                        </span>
                    )}
                </Avatar>

                {!loading ? (
                    events.length !== 0 && events.map(event => (
                        <Card className="bg-bgcolor mb-10 text-center" key={event.id}>
                            <CardHeader>
                                <CardTitle className="text-textcolor">{event.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mb-6">
                                <p className="text-textcolor">Faltam {diffDays(event.starts_at, Date.now())} dias</p>
                                <p className="text-textcolor">{diffDays(event.starts_at, event.created_at) - diffDays(event.starts_at, Date.now())} dias já foram esperados</p>
                            </CardContent>
                            <CardFooter className="justify-center">
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
                    <Button asChild>
                        <Link to={`/pages/${id}`}>Voltar</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Edit
