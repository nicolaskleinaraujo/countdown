// Modules
import express, { Request, Response, IRouter } from "express"
import { userController } from "../controllers/user"
import { validateToken } from "../middleware/validateToken"

const usersRouter: IRouter = express.Router()

// Routes
usersRouter.route("/").post((req: Request, res: Response) => userController.createUser(req, res))
usersRouter.route("/").delete(validateToken, (req: Request, res: Response) => userController.deleteUser(req, res))
usersRouter.route("/login").post((req: Request, res: Response) => userController.createLogin(req, res))
usersRouter.route("/tryauth").post((req: Request, res: Response) => userController.tryAuth(req, res))
usersRouter.route("/").patch(validateToken, (req: Request, res: Response) => userController.updateUser(req, res))

export default usersRouter
