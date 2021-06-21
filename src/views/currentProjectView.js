import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"
import { createProjectView } from "./createCurrentProjectView.js"

(function CurrentProjectView() {
    const $content = document.querySelector(".main-view-content");

    ViewMediator.subscribe(ViewEvents.RENDER_PROJECT, ({ projectTitle, tasks }) => {
        const $ProjectView = createProjectView(projectTitle, tasks);
        $content.textContent = "";
        $content.append($ProjectView);
    });

})();