// Modules
import express, { Request, Response, Application } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app: Application = express()

// Routers
import usersRouter from "./routes/users"
import pagesRouter from "./routes/pages"
import spotifyRouter from "./routes/spotify"

// Configs
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))
app.use(express.json())
app.use(
    cors({
        origin: process.env.ORIGIN_URL,
        credentials: true,
    })
)

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo a minha API. Confira o repositorio para mais informações")
})
app.use("/users", usersRouter)
app.use("/pages", pagesRouter)
app.use("/spotify", spotifyRouter)

export default app
