// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Components
import Navbar from "@/components/Navbar"

// Pages
import Page from "@/pages/Page"
import Edit from "@/pages/Edit"
import Login from "@/pages/Login"
import Home from "@/pages/Home"
import Invite from "@/pages/Invite"
import Register from "@/pages/Register"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/pages/:id" element={ <Page /> } />
                    <Route path="/edit/:id" element={ <Edit /> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/invite/:token" element={ <Invite /> } />
                    <Route path="/register" element={ <Register /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
