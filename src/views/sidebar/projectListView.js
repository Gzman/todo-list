import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"
import { createProjectItem } from "../project/createProjectItem"
import { setItemActive } from "../util";
import { format } from "date-fns"

(function ProjectFilter() {
    const $inboxBtn = document.querySelector(".projects-inbox-btn");
    const $todayBtn = document.querySelector(".projects-today-btn");
    const $weekBtn = document.querySelector(".projects-week-btn");
    const $monthBtn = document.querySelector(".projects-month-btn");

    $inboxBtn.addEventListener("click", (event) => {
        setItemActive(event.currentTarget);
        ViewMediator.publish(ViewEvents.PROJECT_SELECTED, $inboxBtn.textContent)
    });
    $todayBtn.addEventListener("click", (event) => {
        setItemActive(event.currentTarget);
        ViewMediator.publish(ViewEvents.FILTER_TASK_TODAY, format(new Date(), "EEEE"))
    });
    $weekBtn.addEventListener("click", (event) => {
        setItemActive(event.currentTarget)
        ViewMediator.publish(ViewEvents.FILTER_BY_WEEK, `${format(new Date(), "wo")} Week`)
    });
    $monthBtn.addEventListener("click", (event) => {
        setItemActive(event.currentTarget);
        ViewMediator.publish(ViewEvents.FILTER_BY_MONTH, format(new Date(), "LLLL"))
    });

})();

(function ProjectsUserCreated() {
    const $projectItems = document.querySelector(".projects-items");
    const $projectAddBtn = document.querySelector(".projects-add-btn");
    const $newProjectLightbox = document.querySelector(".new-project-container");

    ViewMediator.subscribe(ViewEvents.CREATE_PROJECT, (title) => {
        const $project = createProjectItem(title);
        $projectItems.append($project);
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_PROJECT, (title) => {
        if ($projectItems.hasChildNodes()) {
            [...$projectItems.children]
                .find((item) => item.querySelector(".project-item-name").textContent === title)
                .remove();
        }
    });

    $projectAddBtn.addEventListener("click", () => {
        $newProjectLightbox.classList.add("showItem");
    });

})();