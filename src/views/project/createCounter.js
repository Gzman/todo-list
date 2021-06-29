import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"

function createCounter(projectName) {
    const $counter = document.createElement("p");
    $counter.classList.add("project-item-counter");
    $counter.classList.add("hideItem");
    $counter.textContent = "0";

    const initCounter = ({ projectTitle, taskCount }) => {
        if (projectName !== projectTitle) return;
        if (taskCount > 0) {
            $counter.textContent = taskCount;
            $counter.classList.remove("hideItem");
        }
    }

    const increaseCounter = ({ projectTitle }) => {
        if (projectName !== projectTitle) return;
        let counter = parseInt($counter.textContent);
        $counter.textContent = ++counter;
        if (counter > 0 && $counter.classList.contains("hideItem")) {
            $counter.classList.remove("hideItem");
        }
    }

    const decreaseCounter = ({ projectTitle }) => {
        if (projectName !== projectTitle) return;
        let counter = parseInt($counter.textContent);
        $counter.textContent = --counter;
        if (counter <= 0) {
            $counter.classList.add("hideItem");
        }
    }

    ViewMediator.subscribe(ViewEvents.GET_TASK_COUNT_RESP, initCounter);
    ViewMediator.publish(ViewEvents.GET_TASK_COUNT, projectName);

    ViewMediator.subscribe(ViewEvents.CREATE_TASK, increaseCounter);
    ViewMediator.subscribe(ViewEvents.REMOVE_TASK, decreaseCounter);

    return $counter;
}

export { createCounter }