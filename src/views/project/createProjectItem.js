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
    $projectItem.addEventListener("click", () => ViewMediator.publish(ViewEvents.GET_PROJECT, $name.textContent));
    $projectItem.append($name, $counter);

    const setActive = (title) => {
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

    const remove = (title) => {
        if ($name.textContent === title) {
            ViewMediator.unsubscribe(ViewEvents.GET_PROJECT, setActive);
            ViewMediator.unsubscribe(ViewEvents.REMOVE_PROJECT, remove);
            unsubscribeCounter();
            $projectItem.remove();
        }
    }

    ViewMediator.subscribe(ViewEvents.GET_PROJECT, setActive);
    ViewMediator.subscribe(ViewEvents.REMOVE_PROJECT, remove);

    return $projectItem;
}

export { createProjectItem }