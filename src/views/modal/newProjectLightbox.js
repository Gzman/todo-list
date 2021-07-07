import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"
import { isNameSet, doesNewProjectExists } from "./validator"
import { initFeedback } from "./initFeedback"

(function NewProjectLightbox() {
    const $newProject = document.querySelector(".new-project-lightbox");
    const $form = $newProject.querySelector("#new-project-form");
    const $name = $form.querySelector("#new-project-name");
    const $createBtn = $form.querySelector(".new-project-create-btn");
    const $cancelBtn = $form.querySelector(".new-project-cancel-btn");

    const feedback = initFeedback(".new-project-feedback");

    const validate = () => {
        return [
            isNameSet($name.value),
            doesNewProjectExists($name.value),
        ].filter((error) => error !== null);
    }

    const close = (event) => {
        event?.preventDefault();
        $form.reset();
        feedback.reset();
        document.querySelector(".new-project-container").classList.remove("showItem");
    }

    const submit = (event) => {
        event?.preventDefault();
        const errors = validate();
        if (errors.length === 0) {
            ViewMediator.publish(ViewEvents.CREATE_PROJECT, $name.value);
            close();
        } else {
            feedback.render(errors);
        }
    }

    $createBtn.addEventListener("click", submit);
    $cancelBtn.addEventListener("click", close);

    $newProject.addEventListener("keypress", (event) => {
        if (event.key === "Enter") submit(event);
        if (event.key === "Escape") close(event);
    });

})();