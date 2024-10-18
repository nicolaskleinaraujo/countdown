// Components
import { Button } from "@/components/ui/button"
import { Timer, Menu, X, User } from "lucide-react"

// Modules
import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex flex-row justify-center items-center bg-bgcolor border-b-2 p-3 text-textcolor">
            <div className="flex flex-1 flex-row justify-between items-center">
                <div className="flex flex-row justify-center items-center ml-6 ">
                    <Menu />
                </div>

                <div className="flex flex-row justify-center items-center">
                    <Timer className="h-8 w-8 animate-pulse text-purple-400 mr-2" />
                    <span>Countdown</span>
                </div>

                <div className="flex flex-row justify-center items-center mr-6">
                    <User />
                </div>
            </div>
        </nav>
    )
}

export default Navbar