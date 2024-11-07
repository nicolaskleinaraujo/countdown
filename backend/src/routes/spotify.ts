// Modules
import express, { Request, Response, IRouter } from "express"
import { spotifyController } from "../controllers/spotify"
import { validateToken } from "../middleware/validateToken"

const spotifyRouter: IRouter = express.Router()

// Routes
spotifyRouter.route("/login").post(validateToken, (req: Request, res: Response) => spotifyController.login(req, res))
spotifyRouter.route("/callback").post((req: Request, res: Response) => spotifyController.callback(req, res))
spotifyRouter.route("/search").get(validateToken, (req: Request, res: Response) => spotifyController.search(req, res))

export default spotifyRouter
