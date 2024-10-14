// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Home from "@/pages/Home"
import Edit from "@/pages/Edit"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/edit" element={ <Edit /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
