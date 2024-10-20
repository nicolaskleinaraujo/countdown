// Controllers
import { createLogin } from "./createLogin"
import { createUser } from "./createUser"
import { deAuth } from "./deAuth"
import { deleteUser } from "./deleteUser"
import { tryAuth } from "./tryAuth"
import { updateUser } from "./updateUser"

export const userController = {
    createUser,
    deleteUser,
    createLogin,
    tryAuth,
    updateUser,
    deAuth,
}
