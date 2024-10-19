// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Components
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

// Pages
import Page from "@/pages/Page"
import Edit from "@/pages/Edit"
import Login from "@/pages/Login"
import Home from "@/pages/Home"
import Invite from "@/pages/Invite"
import Register from "@/pages/Register"
import UserRoute from "./UserRoute"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/register" element={ <Register /> } />

                    <Route element={ <UserRoute /> }>
                        <Route path="/pages/:id" element={ <Page /> } />
                        <Route path="/edit/:id" element={ <Edit /> } />
                        <Route path="/invite/:token" element={ <Invite /> } />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default Router
