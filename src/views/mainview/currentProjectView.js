import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"
import { createProjectView } from "./createCurrentProjectView"
import { createTaskItem } from "../task/createTaskItem"

(function CurrentProjectView() {
    const $content = document.querySelector(".main-view-content");

    ViewMediator.subscribe(ViewEvents.GET_PROJECT_RESP, ({ projectTitle, tasks }) => {
        const $ProjectView = createProjectView(projectTitle, tasks);
        $content.textContent = "";
        $content.append($ProjectView);
    });

    ViewMediator.subscribe(ViewEvents.CREATE_TASK, ({ projectTitle, title, description, priority, dueDate }) => {
        if ($content.hasChildNodes()) {
            const $task = createTaskItem(projectTitle, { title, description, priority, dueDate });
            $content.querySelector(".current-project-task-items")?.append($task);
        }
    });

})();