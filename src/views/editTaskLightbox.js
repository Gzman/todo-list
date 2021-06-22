import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"
import { format } from "date-fns";

(function EditTaskLightbox() {
    const $form = document.querySelector("#edit-task-form");
    const $name = $form.querySelector("#edit-task-name-input");
    const $description = $form.querySelector("#edit-task-description-input");
    const $dueDate = $form.querySelector("#edit-task-date-input");
    const $priority = $form.querySelector("#edit-task-priority-select");
    let selectedTask = "";

    ViewMediator.subscribe(ViewEvents.GET_TASK, ({ title, description, dueDate, priority, isComplete }) => {
        selectedTask = title;
        $name.value = title;
        $description.value = description;
        if (dueDate) $dueDate.value = format(dueDate, "yyyy-MM-dd");
        $priority.value = priority;
    });

    const Feedback = (() => {
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

        return { render, reset }
    })();

    const validate = () => {
        const errors = [];
        if ($name.value.length < 1) {
            errors.push({ id: $name, message: "Name must be set." });
        }

        const $taskItems = document.querySelector(".current-project-task-items");
        const taskAlreadyExists = [...$taskItems.children]?.find((item) => item.dataset.task === $name.value);
        if ($name.value !== selectedTask && taskAlreadyExists) {
            errors.push({ id: $name, message: "Task already exists." });
        }

        if ($description.value.length < 1) {
            errors.push({ id: $description, message: "Please fll out a desscription" });
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
        document.querySelector(".edit-task-container").classList.remove("showItem");
    }
    
    const $saveBtn = $form.querySelector(".edit-task-save-btn");
    $saveBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const errors = validate();
        if (errors.length === 0) {
            const project = document.querySelector(".current-project-name")?.textContent;
            ViewMediator.publish(ViewEvents.EDIT_TASK, {
                project,
                title: $name.value,
                description: $description.value,
                dueDate: ($dueDate.value) ? new Date($dueDate.value) : null,
                priority: $priority.value,
            });
            close();
        } else {
            Feedback.render(errors);
        }
    });

    const $cancelBtn = $form.querySelector(".edit-task-cancel-btn");
    $cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        close();
    });

})();