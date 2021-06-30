import {} from "./persistence/storage"
import {} from "./controller/projectController"
import {} from "./views/header/headerView"
import {} from "./views/sidebar/projectListView"
import {} from "./views/sidebar/newProjectLightbox"
import {} from "./views/mainview/currentProjectView"
import {} from "./views/mainview/newTaskLightbox"
import {} from "./views/task/editTaskLightbox"
import {} from "./views/mainview/currentFilterView"

// Show all tasks on startup
import { ViewEvents, ViewMediator } from "./mediator/viewMediator"
ViewMediator.publish(ViewEvents.FILTER_ALL_TASKS, null);