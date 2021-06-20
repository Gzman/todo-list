import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"

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
    const $newProjectLightbox = document.querySelector(".new-project-lightbox");
    let projects = new Set();

    ViewMediator.subscribe(ViewEvents.CREATE_PROJECT, (title) => {
        projects.add(title);
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_PROJECT, (title) => {
        projects.remove(title);
    });

    $projectItems.addEventListener("click", (event) => {
        const project = event.target.closest(".project-item");
        if (!project) {
            const title = project.data.title;
            ViewMediator.publish(ViewEvents.PROJECT_SELECTED, title);
        }
    });

    $projectAddBtn.addEventListener("click", (event) => {
        $newProjectLightbox.classList.add("showItem");
    });
})();