import { ViewEvents, ViewMediator } from "../../mediator/viewMediator";
import { createCounter } from "./createCounter";
import { setItemActive } from "../util"

function createProjectItem(title) {
    const $name = document.createElement("p");
    $name.classList.add("project-item-name");
    $name.textContent = title;

    const { $counter, unsubscribeCounter } = createCounter(title);

    const $projectItem = document.createElement("div");
    $projectItem.classList.add("project-item");
    $projectItem.append($name, $counter);
    $projectItem.addEventListener("click", renderProjectView);

    ViewMediator.subscribe(ViewEvents.GET_PROJECT, renderProjectItemActive);
    ViewMediator.subscribe(ViewEvents.REMOVE_PROJECT, removeProjectItem);

    function renderProjectView() {
        ViewMediator.publish(ViewEvents.GET_PROJECT, $name.textContent);
    }

    function renderProjectItemActive(title) {
        if (title === "Inbox") {
            const inbox = document.querySelector(".projects-inbox-btn");
            setItemActive(inbox);
            return;
        }
        const childOfProjectList = $projectItem.closest(".project-list-view");
        if ($name.textContent === title && childOfProjectList) {
            setItemActive($projectItem);
        }
    }

    function removeProjectItem(title) {
        if ($name.textContent === title) {
            ViewMediator.unsubscribe(ViewEvents.GET_PROJECT, renderProjectItemActive);
            ViewMediator.unsubscribe(ViewEvents.REMOVE_PROJECT, removeProjectItem);
            unsubscribeCounter();
            $projectItem.removeEventListener("click", renderProjectView);
            $projectItem.remove();
        }
    }

    return $projectItem;
}

export { createProjectItem }