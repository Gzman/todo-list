import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"

function createCounter(projectName) {
    const $counter = document.createElement("p");
    $counter.classList.add("project-item-counter");
    $counter.classList.add("hideItem");
    $counter.textContent = "0";

    const initialRenderCounter = ({ projectTitle, taskCount }) => {
        if (projectName !== projectTitle) return;
        if (taskCount > 0) {
            $counter.textContent = taskCount;
            $counter.classList.remove("hideItem");
        }
    }

    const initTaskCounter = (() => {
        ViewMediator.subscribe(ViewEvents.GET_TASK_COUNT_RESP, initialRenderCounter);
        ViewMediator.publish(ViewEvents.GET_TASK_COUNT, projectName);
        ViewMediator.unsubscribe(ViewEvents.GET_TASK_COUNT_RESP, initialRenderCounter);
    })();

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

    ViewMediator.subscribe(ViewEvents.CREATE_TASK, increaseCounter);
    ViewMediator.subscribe(ViewEvents.REMOVE_TASK, decreaseCounter);

    const unsubscribeCounter = () => {
        ViewMediator.unsubscribe(ViewEvents.CREATE_TASK, increaseCounter);
        ViewMediator.unsubscribe(ViewEvents.REMOVE_TASK, decreaseCounter);
    }

    return { $counter, unsubscribeCounter };
}

export { createCounter }