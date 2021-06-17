import {ViewEvents, ViewMediator} from "../mediator/viewMediator.js"

(function ProjectFilter() {
    const $filterBtns = document.querySelectorAll(".projects-filter button");
    $filterBtns.forEach((filterBtns) => {
        filterBtns.addEventListener("click", (event) => {
            const title = event.currentTarget.textContent;
            ViewMediator.publish(ViewEvents.PROJECT_SELECTED, title);
        });
    });
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
        if(!project) {
            const title = project.data.title;
            ViewMediator.publish(ViewEvents.PROJECT_SELECTED, title);
        }
    });

    $projectAddBtn.addEventListener("click", (event) => {
        $newProjectLightbox.classList.add("showItem");
    });
})();