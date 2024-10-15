import { prisma } from "../../db/client"
import { Request, Response } from "express"

interface User {
    email: String,
    password: String,
}

export const createUser = async(req:Request, res:Response) => {
    const { email, password }:User = req.body

    console.log(email, password)
}
