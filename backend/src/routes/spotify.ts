// Modules
import express, { Request, Response, IRouter } from "express"
import { spotifyController } from "../controllers/spotify"
import { validateToken } from "../middleware/validateToken"

const spotifyRouter: IRouter = express.Router()

// Routes

export default spotifyRouter
