// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Page from "@/pages/Page"
import Edit from "@/pages/Edit"
import Login from "@/pages/Login"
import Home from "@/pages/Home"
import Invite from "@/pages/Invite"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/pages/:id" element={ <Page /> } />
                    <Route path="/edit/:id" element={ <Edit /> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/invite/:token" element={ <Invite /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
