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
        ViewMediator.publish(ViewEvents.GET_PROJECT, $inboxBtn.textContent)
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

    ViewMediator.subscribe(ViewEvents.GET_PROJECTS_RESP, (projects) => {
        projects
            .map(project => createProjectItem(project))
            .forEach(item => $projectItems.appendChild(item));
    });
    ViewMediator.publish(ViewEvents.GET_PROJECTS, null);

    ViewMediator.subscribe(ViewEvents.CREATE_PROJECT, (title) => {
        const $project = createProjectItem(title);
        $projectItems.append($project);
        ViewMediator.publish(ViewEvents.GET_PROJECT, title);
    });

    $projectAddBtn.addEventListener("click", () => {
        $newProjectLightbox.classList.add("showItem");
    });

})();

(function ProjectListViewResponsiveMenu() {
    const $projectListView = document.querySelector(".project-list-view");
    const $projectListViewBtn = document.querySelector(".project-list-view-btn");
    const $globalFilter = document.querySelector(".global-filter");

    $projectListViewBtn.addEventListener("click", () => {
        $projectListView.classList.toggle("showProjectListView");
    });

    $projectListView.addEventListener("click", () => {
        if ($projectListView.classList.contains("showProjectListView")) {
            $projectListView.classList.remove("showProjectListView");
        }
    });

    $globalFilter.addEventListener("click", () => {
        $projectListView.classList.remove("showProjectListView");
    });

})();