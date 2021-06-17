import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"

(function NewTaskLightbox() {
    const $form = document.querySelector("#task-form");
    const $name = $from.querySelector("#task-name");
    const $description = $form.querySelector("#task-description");
    const $dueDate = $form.querySelector("#task-date");
    const $priority = $form.querySelector("#task-priority");
    const $cancelBtn = $form.querySelector(".new-task-cancel-btn");
    const $createBtn = $form.querySelector(".new-task-create-btn");
    const $taskItems = document.querySelector(".current-project-task-items").children;
    const currentProject = document.querySelector(".current-project-name").textContent;

    const Feedback = () => {
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

        return { render }
    }

    const validate = () => {
        const errors = [];
        if ($name.value.length < 1) {
            errors.push({ id: $name, message: "Name must be set." });
        }
        const taskAlreadyExists = $taskItems.find((item) => item.dataset.task === $name.value); 
        if (taskAlreadyExists) {
            errors.push({ id: $name, message: "Task already exists." });
        }
        if ($description.value.length < 1) {
            errors.push({ id: $description, message: "Please fll out a desscription" });
        }
        const now = new Date();
        if (new Date($dueDate.value) < now) {
            errors.push({ id: $dueDate, message: "Date can't be in the past." });
        }
        return errors;
    }

    $cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        $form.reset();
        const $newTaskContainer = document.querySelector(".new-task-container");
        $newTaskContainer.classList.remove("showItem");
    });

    const createNewTask = () => {
        return {
            title: $name.value,
            description: $description.value,
            dueDate: $dueDate.value,
            priority: $priority.text,
            isComplete: false
        }
    }

    $createBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const errors = validate();
        if (errors.length === 0) {
            const task = createNewTask();
            ViewMediator.publish(ViewEvents.CREATE_TASK, currentProject, task);
            $form.reset();
        } else {
            Feedback.render(errors);
        }
    });
})();