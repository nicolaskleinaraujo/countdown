// Modules
import express, { Request, Response } from "express"
const app = express()

// Routes
import usersRouter from "./routes/users"

app.get("/", (req:Request, res:Response) => {
    res.send("Bem-vindo a minha API feita em TypeScript")
})
app.use("/users", usersRouter)

export default app
