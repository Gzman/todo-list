import {} from "./persistence/storage"
import {} from "./controller/projectController"
import {} from "./views/header/headerView"
import {} from "./views/sidebar/projectListView"
import {} from "./views/modal/newProjectLightbox"
import {} from "./views/mainview/currentProjectView"
import {} from "./views/modal/newTaskLightbox"
import {} from "./views/modal/editTaskLightbox"
import {} from "./views/mainview/currentFilterView"

// Show all tasks on startup
import { ViewEvents, ViewMediator } from "./mediator/viewMediator"
ViewMediator.publish(ViewEvents.FILTER_ALL_TASKS, null);


