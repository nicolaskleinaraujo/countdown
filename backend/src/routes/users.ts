// Modules
import express, { Request, Response } from "express"
import { userController } from "../controllers/user"

const usersRouter = express.Router()

usersRouter.route("/").post((req:Request, res:Response) => userController.createUser(req, res))

export default usersRouter
