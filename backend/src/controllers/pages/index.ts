// Controllers
import { createEvent } from "./createEvent"
import { createPage } from "./createPage"
import { deleteEvent } from "./deleteEvent"
import { updateEvent } from "./updateEvent"
import { updatePageImage } from "./updatePageImage"
import { updatePageTitle } from "./updatePageTitle"

export const pageController = {
    createPage,
    createEvent,
    deleteEvent,
    updateEvent,
    updatePageImage,
    updatePageTitle,
}
