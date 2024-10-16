// Modules
import express, { Request, Response, Application } from "express"
import cookieParser from "cookie-parser"
const app: Application = express()

// Routers
import usersRouter from "./routes/users"

// Configs
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo a minha API feita em TypeScript")
})
app.use("/users", usersRouter)

export default app
