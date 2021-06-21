import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"
import { createProjectItem } from "./createProjectItem.js"

(function ProjectFilter() {
    const $inboxBtn = document.querySelector(".projects-inbox-btn");
    const $todayBtn = document.querySelector(".projects-today-btn");
    const $weekBtn = document.querySelector(".projects-week-btn");
    const $monthBtn = document.querySelector(".projects-month-btn");

    $inboxBtn.addEventListener("click", (event) => ViewMediator.publish(ViewEvents.PROJECT_SELECTED, $inboxBtn.textContent));
    $todayBtn.addEventListener("click", (event) => ViewMediator.publish(ViewEvents.FILTER_TASK_BY_DATE, new Date()));
    $weekBtn.addEventListener("click", (event) => ViewMediator.publish(ViewEvents.FILTER_BY_WEEK, new Date()));
    $monthBtn.addEventListener("click", (event) => ViewMediator.publish(ViewEvents.FILTER_BY_MONTH, new Date()));

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

    $projectItems.addEventListener("click", (event) => {
        const $project = event.target.closest(".project-item");
        if (!$project) {
            const title = $project.querySelector(".project-item-name").textContent;
            ViewMediator.publish(ViewEvents.PROJECT_SELECTED, title);
        }
    });

    $projectAddBtn.addEventListener("click", (event) => {
        $newProjectLightbox.classList.add("showItem");
    });

})();