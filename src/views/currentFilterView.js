import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"
import { createTaskItem } from "./createTaskItem.js"

(function CurrentFilterView() {
    const $content = document.querySelector(".main-view-content");

    const renderFilteredTasks = (filtered) => {
        $content.textContent = "";
        filtered.forEach(p => {
            const $project = document.createElement("p");
            $project.textContent = p.project;
            $project.addEventListener("click", (event) => {
                const $project = event.currentTarget;
                ViewMediator.publish(ViewEvents.PROJECT_SELECTED, $project.textContent);
            });
            const $taskItems = p.tasks.map((task) => createTaskItem(p.project, task));
            const $div = document.createElement("div");
            $div.append($project, $taskItems);
            $content.append($div);
        });
    }

    ViewMediator.subscribe(ViewEvents.GET_FILTERED_TASKS, (filtered) => renderFilteredTasks(filtered));
})();
