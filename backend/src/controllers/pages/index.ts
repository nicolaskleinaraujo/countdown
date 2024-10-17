// Controllers
import { createEvent } from "./createEvent"
import { createPage } from "./createPage"
import { deleteEvent } from "./deleteEvent"
import { getPage } from "./getPage"
import { invitePage } from "./invitePage"
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
    getPage,
    invitePage,
}
