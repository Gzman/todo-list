import { ViewEvents, ViewMediator } from "../../mediator/viewMediator";
import { setItemActive } from "../util"

function createProjectItem(title) {
    const $name = document.createElement("p");
    $name.classList.add("project-item-name");
    $name.textContent = title;

    const $projectItem = document.createElement("div");
    $projectItem.classList.add("project-item");
    $projectItem.addEventListener("click", () => ViewMediator.publish(ViewEvents.PROJECT_SELECTED, $name.textContent));
    $projectItem.append($name);

    const setActive = (title) => {
        if (title === "Inbox" && $name.textContent === "Inbox") {
            const inbox = document.querySelector(".projects-inbox-btn");
            setItemActive(inbox);
            return;
        }
        const childOfProjectList = $projectItem.closest(".project-list-view");
        if ($name.textContent === title && childOfProjectList) {
            setItemActive($projectItem);
        }
    }
    ViewMediator.subscribe(ViewEvents.PROJECT_SELECTED, (title) => setActive(title));

    ViewMediator.subscribe(ViewEvents.REMOVE_PROJECT, (title) => {
        if ($name.textContent === title) {
            $projectItem.remove();
        }
    });

    return $projectItem;
}

export { createProjectItem }