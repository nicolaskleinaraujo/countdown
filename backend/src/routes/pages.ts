// Modules
import express, { Request, Response, IRouter } from "express"
import { pageController } from "../controllers/pages"
import { validateToken } from "../middleware/validateToken"
import multer, { Multer } from "multer"

const pagesRouter: IRouter = express.Router()
const upload: Multer = multer()

// Routes
pagesRouter.route("/").post(validateToken, upload.single("image"), (req: Request, res: Response) => pageController.createPage(req, res))

export default pagesRouter
