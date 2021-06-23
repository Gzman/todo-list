import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"
import { createProjectView } from "./createCurrentProjectView"

(function CurrentProjectView() {
    const $content = document.querySelector(".main-view-content");

    ViewMediator.subscribe(ViewEvents.RENDER_PROJECT, ({ projectTitle, tasks }) => {
        const $ProjectView = createProjectView(projectTitle, tasks);
        $content.textContent = "";
        $content.append($ProjectView);
    });

})();