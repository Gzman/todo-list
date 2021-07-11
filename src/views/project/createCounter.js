import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"

function createCounter(projectName) {
    const $counter = document.createElement("p");
    $counter.dataset.project = projectName;
    $counter.classList.add("project-item-counter");
    $counter.classList.add("hideItem");
    $counter.textContent = "0";

    const initialCounterRendering = ({ projectTitle, taskCount }) => {
        if (projectName !== projectTitle) return;
        if (taskCount > 0) {
            $counter.textContent = taskCount;
            $counter.classList.remove("hideItem");
        }
    }

    const initCounter = (() => {
        ViewMediator.subscribe(ViewEvents.GET_TASK_COUNT_RESP, initialCounterRendering);
        ViewMediator.publish(ViewEvents.GET_TASK_COUNT, projectName);
        ViewMediator.unsubscribe(ViewEvents.GET_TASK_COUNT_RESP, initialCounterRendering);
    })();

    return $counter;
}

const findCounter = (projectTitle) => {
    return [...document.querySelectorAll(".project-item-counter")]
        .find(($counter) => $counter.dataset.project === projectTitle);
}

const increaseCounter = ({ projectTitle }) => {
    const $counter = findCounter(projectTitle);
    if (!$counter) return;
    let counter = parseInt($counter.textContent);
    $counter.textContent = ++counter;
    if (counter > 0 && $counter.classList.contains("hideItem")) {
        $counter.classList.remove("hideItem");
    }
}

const decreaseCounter = ({ projectTitle }) => {
    const $counter = findCounter(projectTitle);
    if (!$counter) return;
    let counter = parseInt($counter.textContent);
    $counter.textContent = --counter;
    if (counter <= 0) {
        $counter.classList.add("hideItem");
    }
}

ViewMediator.subscribe(ViewEvents.CREATE_TASK, increaseCounter);
ViewMediator.subscribe(ViewEvents.REMOVE_TASK, decreaseCounter);

export { createCounter }