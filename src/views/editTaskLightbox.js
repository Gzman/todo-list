import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"
import { format } from "date-fns";

(function EditTaskLightbox() {
    const $form = document.querySelector("#edit-task-form");
    const $name = $form.querySelector("#edit-task-name-input");
    const $description = $form.querySelector("#edit-task-description-input");
    const $dueDate = $form.querySelector("#edit-task-date-input");
    const $priority = $form.querySelector("#edit-task-priority-select");
    let project = "";
    let taskToEdit = "";
    let taskToEditComplete = false;

    ViewMediator.subscribe(ViewEvents.GET_TASK, ({ projectTitle, task }) => {
        const { title, description, dueDate, priority, isComplete } = task;
        project = projectTitle;
        taskToEdit = title;
        $name.value = title;
        $description.value = description;
        if (dueDate) $dueDate.value = format(dueDate, "yyyy-MM-dd");
        $priority.value = priority;
        taskToEditComplete = isComplete;
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

    let taskAlreadyExists = true;
    ViewMediator.subscribe(ViewEvents.TASK_EXISTS, (taskExists) => taskAlreadyExists = taskExists);
    const validate = () => {
        const errors = [];
        if ($name.value.length < 1) {
            errors.push({ id: $name, message: "Name must be set." });
        }

        ViewMediator.publish(ViewEvents.DOES_TASK_EXISTS, { projectTitle: project, title: $name.value });
        if ($name.value !== taskToEdit && taskAlreadyExists) {
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
            ViewMediator.publish(ViewEvents.EDIT_TASK, {
                projectTitle: project,
                taskToEdit,
                title: $name.value,
                description: $description.value,
                dueDate: ($dueDate.value) ? new Date($dueDate.value) : null,
                priority: $priority.value,
                isComplete : taskToEditComplete,
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