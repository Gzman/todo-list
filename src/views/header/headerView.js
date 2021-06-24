import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"

(function HeadBar() {
    const $filter = document.querySelector("#global-filter-text");
    const $completedBtn = document.querySelector("#global-filter-projects");
    const $criticalBtn = document.querySelector("#global-filter-critical");
    const $allBtn = document.querySelector("#global-filter-all");

    $filter.addEventListener("keyup", (event) => {
        const $filter = event.currentTarget;
        ViewMediator.publish(ViewEvents.FILTER_TASK_BY_TEXT, $filter.value);
    });

    $completedBtn.addEventListener("click", () => {
        ViewMediator.publish(ViewEvents.FILTER_COMPLETED_TASKS, null);
    });

    $criticalBtn.addEventListener("click", () => {
        ViewMediator.publish(ViewEvents.FILTER_CRITICAL_TASKS, null);
    });

    $allBtn.addEventListener("click", () => {
        ViewMediator.publish(ViewEvents.FILTER_ALL_TASKS, null);
    });

})();