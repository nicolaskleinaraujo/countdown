// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Page from "@/pages/Page"
import Edit from "@/pages/Edit"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/:id" element={ <Page /> } />
                    <Route path="/edit/:id" element={ <Edit /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
