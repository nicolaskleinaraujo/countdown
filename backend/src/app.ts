// Modules
import express, { Request, Response, Application } from "express"
const app: Application = express()

// Routers
import usersRouter from "./routes/users"

// Configs
app.use(express.json())

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo a minha API feita em TypeScript")
})
app.use("/users", usersRouter)

export default app
