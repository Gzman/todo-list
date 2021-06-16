import {ViewEvents, viewMediator} from "../mediator/viewMediator.js"

(function projectFilter() {
    const $filterBtns = document.querySelectorAll(".projects-filter button");
    $filterBtns.forEach((filterBtns) => {
        filterBtns.addEventListener("click", (event) => {
            const title = event.currentTarget.textContent;
            viewMediator.publish(ViewEvents.SELECT_PROJECT, title);
        });
    });
})();

(function projectsUserCreated() {
    const $projectItems = document.querySelector(".projects-items");
    const $projectAddBtn = document.querySelector(".projects-add-btn");
    const $newProjectLightbox = document.querySelector(".new-project-lightbox");
    let projects = new Set();

    viewMediator.subscribe(ViewEvents.CREATE_PROJECT, (title) => {
        console.log("Project created: ", title);
        projects.add(title);
    });

    viewMediator.subscribe(ViewEvents.REMOVE_PROJECT, (title) => {
        console.log("Project removed: ", title);
        projects.remove(title);
    });

    $projectItems.addEventListener("click", (event) => {
        const project = event.target.closest(".project-item");
        if(!project) {
            const title = project.data.title;
            console.log("Project selected: ", title);
            viewMediator.publish(ViewEvents.SELECT_PROJECT, title);
        }
    });

    $projectAddBtn.addEventListener("click", (event) => {
        $newProjectLightbox.classList.add("showItem");
    });
})();