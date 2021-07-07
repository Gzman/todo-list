import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"
import { isNameSet, doesNewTaskExists, isValidDate } from "./validator";
import { initPrioritySelet } from "./initPrioritySelect"
import { initFeedback } from "./initFeedback"

(function NewTaskLightbox() {
    const $newTask = document.querySelector(".new-task-lightbox");
    const $form = $newTask.querySelector("#task-form");
    const $name = $form.querySelector("#task-name-input");
    const $description = $form.querySelector("#task-description-input");
    const $dueDate = $form.querySelector("#task-date-input");
    const $priority = $form.querySelector("#task-priority-select");
    const $cancelBtn = $form.querySelector(".new-task-cancel-btn");
    const $createBtn = $form.querySelector(".new-task-create-btn");
    let currentProject = "";

    initPrioritySelet($priority.id);
    const feedback = initFeedback(".task-feedback");
    ViewMediator.subscribe(ViewEvents.GET_PROJECT_RESP, ({ projectTitle }) => currentProject = projectTitle);

    const validate = () => {
        return [
            isNameSet($name.value),
            doesNewTaskExists(currentProject, $name.value),
            isValidDate($dueDate.value),
        ].filter((error) => error !== null);
    }

    const close = (event) => {
        event?.preventDefault();
        $form.reset();
        feedback.reset();
        document.querySelector(".new-task-container").classList.remove("showItem");
    }

    const submit = (event) => {
        event?.preventDefault();
        const errors = validate();
        if (errors.length === 0) {
            ViewMediator.publish(ViewEvents.CREATE_TASK, {
                projectTitle: currentProject,
                title: $name.value,
                description: $description.value,
                dueDate: ($dueDate.value) ? new Date($dueDate.value) : null,
                priority: $priority.value
            });
            close();
        } else {
            feedback.render(errors);
        }
    }

    $createBtn.addEventListener("click", submit);
    $cancelBtn.addEventListener("click", close);

    $newTask.addEventListener("keypress", (event) => {
        if (event.key === "Enter") submit(event);
        if (event.key === "Escape") close(event);
    })

})();