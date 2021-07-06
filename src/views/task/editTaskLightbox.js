import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"
import { taskPriorities } from "./taskPriorities"
import { DATE_FORMAT } from "../util";
import { format } from "date-fns";

(function EditTaskLightbox() {
    const $editTask = document.querySelector(".edit-task-lightbox");
    const $form = $editTask.querySelector("#edit-task-form");
    const $name = $form.querySelector("#edit-task-name-input");
    const $description = $form.querySelector("#edit-task-description-input");
    const $dueDate = $form.querySelector("#edit-task-date-input");
    const $priority = $form.querySelector("#edit-task-priority-select");
    let project = "";
    let taskToEdit = "";
    let taskToEditComplete = false;

    const initPrioritySelet = (() => {
        taskPriorities.forEach((priority) => {
            const $option = document.createElement("option");
            $option.text = priority;
            $priority.add($option);
        })
    })();

    ViewMediator.subscribe(ViewEvents.GET_TASK_RESP, ({ projectTitle, task }) => {
        const { title, description, dueDate, priority, isComplete } = task;
        project = projectTitle;
        taskToEdit = title;
        $name.value = title;
        $description.value = description;
        if (dueDate) $dueDate.value = format(dueDate, DATE_FORMAT);
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
    ViewMediator.subscribe(ViewEvents.DOES_TASK_EXISTS_RESP, (taskExists) => taskAlreadyExists = taskExists);
    const validate = () => {
        const errors = [];
        if ($name.value.length < 1) {
            errors.push({ id: $name, message: "Name must be set." });
        }

        ViewMediator.publish(ViewEvents.DOES_TASK_EXISTS, { projectTitle: project, title: $name.value });
        if ($name.value !== taskToEdit && taskAlreadyExists) {
            errors.push({ id: $name, message: "Task already exists." });
        }

        const now = new Date();
        now.setHours(0);
        const dueDate = new Date($dueDate.value);
        if (dueDate < now) {
            errors.push({ id: $dueDate, message: "Date can't be in the past." });
        }
        return errors;
    }

    const close = (event) => {
        event?.preventDefault();
        $form.reset();
        Feedback.reset();
        document.querySelector(".edit-task-container").classList.remove("showItem");
    }

    const submit = (event) => {
        event?.preventDefault();
        const errors = validate();
        if (errors.length === 0) {
            ViewMediator.publish(ViewEvents.EDIT_TASK, {
                projectTitle: project,
                taskToEdit,
                title: $name.value,
                description: $description.value,
                dueDate: ($dueDate.value) ? new Date($dueDate.value) : null,
                priority: $priority.value,
                isComplete: taskToEditComplete,
            });
            close();
        } else {
            Feedback.render(errors);
        }
    }

    const $saveBtn = $form.querySelector(".edit-task-save-btn");
    $saveBtn.addEventListener("click", submit);

    const $cancelBtn = $form.querySelector(".edit-task-cancel-btn");
    $cancelBtn.addEventListener("click", close);

    $editTask.addEventListener("keypress", (event) => {
        if (event.key === "Enter") submit(event);
        if (event.key === "Escape") close(event);
    });

})();