// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Page from "@/pages/Page"
import Edit from "@/pages/Edit"
import Login from "@/pages/Login"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/pages/:id" element={ <Page /> } />
                    <Route path="/edit/:id" element={ <Edit /> } />
                    <Route path="/login" element={ <Login /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
