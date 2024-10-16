// Controllers
import { createLogin } from "./createLogin"
import { createUser } from "./createUser"
import { deleteUser } from "./deleteUser"

export const userController = {
    createUser,
    deleteUser,
    createLogin,
}
