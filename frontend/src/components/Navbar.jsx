// Components
import { Timer, User } from "lucide-react"

// Modules
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"

const Navbar = () => {
    const { userId } = useContext(UserContext)

    return (
        <nav className="flex flex-1 flex-row justify-between items-center bg-bgcolor2 border-b-2 p-3 text-textcolor">
            <Link className="flex flex-row justify-center items-center ml-2" to={"/"}>
                <Timer className="h-8 w-8 animate-pulse text-purple-400 mr-2" />
                <span>Countdown</span>
            </Link>

            <div className="flex flex-row justify-center items-center mr-2">
                <Link to={userId !== 0 ? "/user" : "/login"}><User /></Link>
            </div>
        </nav>
    )
}

export default Navbar