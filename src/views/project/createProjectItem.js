import { ViewEvents, ViewMediator } from "../../mediator/viewMediator";
import { setActive } from "../util"

function createProjectItem(title) {
    const $name = document.createElement("p");
    $name.classList.add("project-item-name");
    $name.textContent = title;

    const $projectItem = document.createElement("div");
    $projectItem.classList.add("project-item");
    $projectItem.addEventListener("click", (event) => {
        setActive(event.currentTarget);
        ViewMediator.publish(ViewEvents.PROJECT_SELECTED, $name.textContent);
    });
    $projectItem.append($name);

    return $projectItem;
}

export { createProjectItem }