import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"
import { isNameSet, doesEditedTaskExists, isValidDate } from "./validator"
import { initPrioritySelet } from "./initPrioritySelect"
import { initFeedback } from "./initFeedback";
import { DATE_FORMAT } from "../util";
import { format } from "date-fns";

(function EditTaskLightbox() {
    const $editTask = document.querySelector(".edit-task-lightbox");
    const $form = $editTask.querySelector("#edit-task-form");
    const $name = $form.querySelector("#edit-task-name-input");
    const $description = $form.querySelector("#edit-task-description-input");
    const $dueDate = $form.querySelector("#edit-task-date-input");
    const $priority = $form.querySelector("#edit-task-priority-select");
    const $saveBtn = $form.querySelector(".edit-task-save-btn");
    const $cancelBtn = $form.querySelector(".edit-task-cancel-btn");
    let currentProject = "";
    let taskToEdit = "";
    let taskToEditComplete = false;

    initPrioritySelet($priority.id);
    const feedback = initFeedback(".edit-task-feedback");
    ViewMediator.subscribe(ViewEvents.GET_TASK_RESP, ({ projectTitle, task }) => {
        const { title, description, dueDate, priority, isComplete } = task;
        currentProject = projectTitle;
        taskToEdit = title;
        $name.value = title;
        $description.value = description;
        if (dueDate) $dueDate.value = format(dueDate, DATE_FORMAT);
        $priority.value = priority;
        taskToEditComplete = isComplete;
    });

    const validate = () => {
        return [
            isNameSet($name.value),
            doesEditedTaskExists(currentProject, taskToEdit, $name.value),
            isValidDate($dueDate.value),
        ].filter((error) => error !== null);
    }

    const close = (event) => {
        event?.preventDefault();
        $form.reset();
        feedback.reset();
        document.querySelector(".edit-task-container").classList.remove("showItem");
    }

    const submit = (event) => {
        event?.preventDefault();
        const errors = validate();
        if (errors.length === 0) {
            ViewMediator.publish(ViewEvents.EDIT_TASK, {
                projectTitle: currentProject,
                taskToEdit,
                title: $name.value,
                description: $description.value,
                dueDate: ($dueDate.value) ? new Date($dueDate.value) : null,
                priority: $priority.value,
                isComplete: taskToEditComplete,
            });
            close();
        } else {
            feedback.render(errors);
        }
    }


    $saveBtn.addEventListener("click", submit);
    $cancelBtn.addEventListener("click", close);

    $editTask.addEventListener("keypress", (event) => {
        if (event.key === "Enter") submit(event);
        if (event.key === "Escape") close(event);
    });

})();