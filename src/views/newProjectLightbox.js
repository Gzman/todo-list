import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"

(function NewProjectLightbox() {
    const $form = document.querySelector("#new-project-form");
    const $name = $form.querySelector("#new-project-name");
    const $createBtn = $form.querySelector(".new-project-create-btn");
    const $cancelBtn = $form.querySelector(".new-project-cancel-btn");
    const $projects = document.querySelector(".projects-items").children;

    const Feedback = () => {
        const $feedback = document.querySelector(".new-project-feedback");

        const reset = () => {
            $feedback.classList.remove("showItem");
            $feedback.textContent = "";
        }

        const render = (errors) => {
            reset();
            errors.foreach((error) => {
                const $error = document.createElement("p");
                $error.textContent = error.message;
                $feedback.append($error);
            });
            $feedback.classList.add("showItem");
        }

        return { render }
    }

    const validate = () => {
        const errors = [];
        if ($name.nodeValue.length < 1) {
            errors.push({ id: $name, message: "Please fill out name" });
        }
        const projectAlreadyExists = $projects.find((projectItem) => projectItem.dataset.title === $name.value);
        if (projectAlreadyExists) {
            errors.push({ id: $name, message: "Project already exists." });
        }projects
        return errors;
    }

    $createBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const errors = validate();
        if (errors.length === 0) {
            ViewMediator.publish(ViewEvents.CREATE_PROJECT, $name.value);
        } else {
            Feedback.render(errors);
        }
    });

    $cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const newProjectContainer = document.querySelector(".new-project-container");
        newProjectContainer.classList.remove("showItem");
        $form.reset();
    });
})();