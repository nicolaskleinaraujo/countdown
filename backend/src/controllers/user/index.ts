// Controllers
import { createLogin } from "./createLogin"
import { createUser } from "./createUser"
import { deleteUser } from "./deleteUser"
import { tryAuth } from "./tryAuth"

export const userController = {
    createUser,
    deleteUser,
    createLogin,
    tryAuth,
}
