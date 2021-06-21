import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"

(function HeadBar() {
    const $filter = document.querySelector("#global-filter-text");
    const $completedBtn = document.querySelector("#global-filter-projects");

    $filter.addEventListener("keyup", (event) => {
        const $filter = event.currentTarget;
        ViewMediator.publish(ViewEvents.FILTER_TASK_BY_TEXT, $filter.value);
    });

    $completedBtn.addEventListener("click", (event) => {
        ViewMediator.publish(ViewEvents.FILTER_COMPLETED_TASKS, null);
    });
})();