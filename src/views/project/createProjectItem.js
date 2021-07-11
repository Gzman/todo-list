import { ViewEvents, ViewMediator } from "../../mediator/viewMediator";
import { createCounter } from "./createCounter";
import { setItemActive } from "../util"

function createProjectItem(title) {
    const $name = document.createElement("p");
    $name.classList.add("project-item-name");
    $name.textContent = title;

    const $counter = createCounter(title);

    const $projectItem = document.createElement("div");
    $projectItem.classList.add("project-item");
    $projectItem.addEventListener("click", () => ViewMediator.publish(ViewEvents.GET_PROJECT, $name.textContent));
    $projectItem.append($name, $counter);

    return $projectItem;
}

const renderProjectItemActive = (title) => {
    if (title === "Inbox") {
        const inbox = document.querySelector(".projects-inbox-btn");
        setItemActive(inbox);
        return;
    }
    setItemActive(
        [...document.querySelectorAll(".project-list-view .project-item")]
            ?.find((item) => item.firstElementChild.textContent === title)
    );
}

const removeProjectItem = (title) => {
    [...document.querySelectorAll(".project-item")]
        ?.filter((item) => item.firstElementChild.textContent === title)
        ?.forEach((item) => item.remove());
}

ViewMediator.subscribe(ViewEvents.GET_PROJECT, renderProjectItemActive);
ViewMediator.subscribe(ViewEvents.REMOVE_PROJECT, removeProjectItem);

export { createProjectItem }