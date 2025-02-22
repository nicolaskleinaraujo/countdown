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
import User from "@/pages/User"
import SpotifyCallback from "@/pages/SpotifyCallback"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/register" element={ <Register /> } />
                    <Route path="/spotify/callback" element={ <SpotifyCallback /> } />

                    <Route element={ <UserRoute /> }>
                        <Route path="/pages/:id" element={ <Page /> } />
                        <Route path="/edit/:id" element={ <Edit /> } />
                        <Route path="/invite/:token" element={ <Invite /> } />
                        <Route path="/user" element={ <User /> } />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default Router
