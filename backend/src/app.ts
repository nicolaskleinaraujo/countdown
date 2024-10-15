// Modules
import express from "express"
export const app = express()

app.get("/", (req, res) => {
    res.send("Bem-vindo a minha API feita em TypeScript")
})
