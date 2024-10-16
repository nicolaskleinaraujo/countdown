// Modules
import express, { Request, Response, IRouter } from "express"
import { userController } from "../controllers/user"
const usersRouter: IRouter = express.Router()

// Routes
usersRouter.route("/").post((req: Request, res: Response) => userController.createUser(req, res))
usersRouter.route("/").delete((req: Request, res: Response) => userController.deleteUser(req, res))
usersRouter.route("/login").post((req: Request, res: Response) => userController.createLogin(req, res))

export default usersRouter
