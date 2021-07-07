import { taskPriorities } from "../task/taskPriorities";

const initPrioritySelet = (prioritySelectId) => {
    const $priority = document.getElementById(prioritySelectId);

    taskPriorities.forEach((priority) => {
        const $option = document.createElement("option");
        $option.text = priority;
        $priority?.add($option);
    });
};

export { initPrioritySelet }