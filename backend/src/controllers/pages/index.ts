// Controllers
import { createEvent } from "./createEvent"
import { createInvite } from "./createInvite"
import { createPage } from "./createPage"
import { deleteEvent } from "./deleteEvent"
import { getPage } from "./getPage"
import { invitePage } from "./invitePage"
import { updateEvent } from "./updateEvent"
import { updateMusic } from "./updateMusic"
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
    createInvite,
    updateMusic,
}
