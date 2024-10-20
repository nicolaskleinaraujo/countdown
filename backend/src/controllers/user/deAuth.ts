import { Request, Response } from "express"

export const deAuth = async(req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("access")
        res.clearCookie("refresh")

        res.status(200).json({ msg: "Usuario desautenticado" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}
