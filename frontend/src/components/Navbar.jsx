// Components
import { Timer, User } from "lucide-react"

// Modules
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex flex-1 flex-row justify-between items-center bg-bgcolor border-b-2 p-3 text-textcolor">
            <Link className="flex flex-row justify-center items-center ml-2" to={"/"}>
                <Timer className="h-8 w-8 animate-pulse text-purple-400 mr-2" />
                <span>Countdown</span>
            </Link>

            <div className="flex flex-row justify-center items-center mr-2">
                <Link to={"/login"}><User /></Link>
            </div>
        </nav>
    )
}

export default Navbar