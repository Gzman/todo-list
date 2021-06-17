import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"

(function EditTaskLightbox() {
    const $form = document.querySelector("#edit-task-form");
    const $name = $from.querySelector("#edit-task-name");
    const $description = $form.querySelector("#edit-task-description");
    const $dueDate = $form.querySelector("#edit-task-date");
    const $priority = $form.querySelector("#edit-task-priority");
    const $taskItems = document.querySelector(".current-project-task-items").children;
    const currentProject = document.querySelector(".current-project-name").textContent;
    const taskToEdit;

    ViewMediator.subscribe(ViewEvents.GET_TASK, ({ title, description, dueDate, priority }) => {
        taskToEdit = title;
        $name.value = title;
        $description.value = description;
        $dueDate.value = dueDate;
        $priority.value = priority;
    });

    const Feedback = () => {
        const $feedback = document.querySelector(".edit-task-feedback");

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
        if ($name.value !== taskToEdit && taskAlreadyExists) {
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

    const $cancelBtn = $form.querySelector(".edit-task-cancel-btn");
    $cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        $form.reset();
        const $editTaskContainer = document.querySelector(".edit-task-container");
        $editTaskContainer.classList.remove("showItem");
    });

    const $saveBtn = $form.querySelector(".edit-task-save-btn");
    $saveBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const errors = validate();
        if (errors.length === 0) {
            const task = {
                title: $name.value,
                description: $description.value,
                dueDate: $dueDate.value,
                priority: $priority.text,
                isComplete: false
            }
            ViewMediator.publish(ViewEvents.EDIT_TASK, currentProject, task);
            $form.reset();
        } else {
            Feedback.render(errors);
        }
    });
})();