import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js";

function createProjectItem(title) {
    const $projectItem = document.createElement("div");
    $projectItem.classList.add("project-item");

    const $name = document.createElement("p");
    $name.classList.add("project-item-name");
    $name.textContent = title;
    $name.addEventListener("click", (event) => {
        const $project = event.currentTarget;
        ViewMediator.publish(ViewEvents.PROJECT_SELECTED, $project.textContent); 
    });

    $projectItem.append($name);
    return $projectItem;
}

export { createProjectItem }