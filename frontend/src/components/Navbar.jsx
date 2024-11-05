// Components
import { Timer, User } from "lucide-react"

// Modules
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"

const Navbar = () => {
    const { userId } = useContext(UserContext)

    return (
        <nav className="flex flex-1 flex-row justify-between items-center bg-bgcolor2 border-b-2 py-6 px-4 text-textcolor lg:py-7">
            <Link className="flex flex-row justify-center items-center ml-2 md:ml-7" to={"/"}>
                <Timer className="h-8 w-8 animate-pulse text-purple-400 mr-2 md:h-10 md:w-10 lg:h-12 lg:w-12" />
                <span className="font-bold text-xl md:text-2xl lg:text-3xl">Countdown</span>
            </Link>

            <div className="flex flex-row justify-center items-center mr-2 md:mr-7">
                <Link to={userId !== 0 ? "/user" : "/login"}><User className="md:h-8 md:w-8 lg:h-10 lg:w-10" /></Link>
            </div>
        </nav>
    )
}

export default Navbar
