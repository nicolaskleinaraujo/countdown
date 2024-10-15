// Modules
import express, { Request, Response } from "express"

export const app = express()

app.get("/", (req:Request, res:Response) => {
    res.send("Bem-vindo a minha API feita em TypeScript")
})
