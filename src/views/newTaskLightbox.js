import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"

(function NewTaskLightbox() {
    const $form = document.querySelector("#task-form");
    const $name = $form.querySelector("#task-name-input");
    const $description = $form.querySelector("#task-description-input");
    const $dueDate = $form.querySelector("#task-date-input");
    const $priority = $form.querySelector("#task-priority-select");
    const $cancelBtn = $form.querySelector(".new-task-cancel-btn");
    const $createBtn = $form.querySelector(".new-task-create-btn");

    const Feedback = (() => {
        const $feedback = document.querySelector(".task-feedback");

        const reset = () => {
            $feedback.classList.remove("showItem");
            $feedback.textContent = "";
        }

        const render = (errors) => {
            reset();
            errors.forEach(error => {
                const $error = document.createElement("p");
                $error.textContent = error.message;
                $feedback.append($error);
            });
            $feedback.classList.add("showItem");
        }

        return { render, reset }
    })();

    const validate = () => {
        const errors = [];
        if ($name.value.length < 1) {
            errors.push({ id: $name, message: "Name must be set." });
        }

        const $taskItems = document.querySelector(".current-project-task-items");
        const taskAlreadyExists = [...$taskItems.children]?.find((item) => item.dataset.task === $name.value);
        if (taskAlreadyExists) {
            errors.push({ id: $name, message: "Task already exists." });
        }

        if ($description.value.length < 1) {
            errors.push({ id: $description, message: "Please fill out a desscription" });
        }
        
        const now = new Date("YYYY-MM-DD");
        const dueDate = new Date($dueDate.value);
        if (dueDate < now) {
            errors.push({ id: $dueDate, message: "Date can't be in the past." });
        }
        return errors;
    }

    const close = () => {
        $form.reset();
        Feedback.reset();
        document.querySelector(".new-task-container").classList.remove("showItem");
    }

    $createBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const errors = validate();
        if (errors.length === 0) {
            const projectTitle = document.querySelector(".current-project-name")?.textContent;
            ViewMediator.publish(ViewEvents.CREATE_TASK, {
                projectTitle,
                title: $name.value,
                description: $description.value,
                dueDate: ($dueDate.value) ? new Date($dueDate.value) : null,
                priority: $priority.value
            });
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