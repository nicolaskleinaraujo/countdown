// Modules
import express, { Request, Response, IRouter } from "express"
import { pageController } from "../controllers/pages"
import { validateToken } from "../middleware/validateToken"
import multer, { Multer } from "multer"

const pagesRouter: IRouter = express.Router()
const upload: Multer = multer()

// Routes
pagesRouter.route("/").post(validateToken, upload.single("image"), (req: Request, res: Response) => pageController.createPage(req, res))
pagesRouter.route("/event").post(validateToken, (req: Request, res: Response) => pageController.createEvent(req, res))
pagesRouter.route("/event").delete(validateToken, (req: Request, res: Response) => pageController.deleteEvent(req, res))
pagesRouter.route("/event").patch(validateToken, (req: Request, res: Response) => pageController.updateEvent(req, res))

export default pagesRouter