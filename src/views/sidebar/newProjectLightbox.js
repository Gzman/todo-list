import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"

(function NewProjectLightbox() {
    const $form = document.querySelector("#new-project-form");
    const $name = $form.querySelector("#new-project-name");
    const $createBtn = $form.querySelector(".new-project-create-btn");
    const $cancelBtn = $form.querySelector(".new-project-cancel-btn");

    const Feedback = (() => {
        const $feedback = document.querySelector(".new-project-feedback");

        const reset = () => {
            $feedback.classList.remove("showItem");
            $feedback.textContent = "";
        }

        const render = (errors) => {
            reset();
            errors.forEach((error) => {
                const $error = document.createElement("p");
                $error.textContent = error.message;
                $feedback.append($error);
            });
            $feedback.classList.add("showItem");
        }

        return { render, reset }
    })();

    let doesProjectExists = true;
    ViewMediator.subscribe(ViewEvents.PROJECT_EXISTS, (projectExists) => doesProjectExists = projectExists);
    
    const validate = () => {
        const errors = [];
        if ($name.value.length < 1) {
            errors.push({ id: $name, message: "Please fill out name" });
        }

        ViewMediator.publish(ViewEvents.DOES_PROJECT_EXISTS, $name.value);
        if (doesProjectExists) {
            errors.push({ id: $name, message: "Project already exists." });
        }

        return errors;
    }

    const close = () => {
        $form.reset();
        Feedback.reset();
        document.querySelector(".new-project-container").classList.remove("showItem");
    }

    $createBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const errors = validate();
        if (errors.length === 0) {
            ViewMediator.publish(ViewEvents.CREATE_PROJECT, $name.value);
            close();
        } else {
            Feedback.render(errors);
        }
    });

    $cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        close();
    });
})();