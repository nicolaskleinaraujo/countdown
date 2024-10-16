// Modules
import express, { Request, Response, IRouter } from "express"
import { pageController } from "../controllers/pages"
import { validateToken } from "../middleware/validateToken"

const pagesRouter: IRouter = express.Router()

// Routes

export default pagesRouter
