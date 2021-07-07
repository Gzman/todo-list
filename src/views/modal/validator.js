import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"

const doesTaskExists = (() => {
    let doesExists = true;
    ViewMediator.subscribe(ViewEvents.DOES_TASK_EXISTS_RESP, (taskExists) => doesExists = taskExists);

    return (projectTitle, title) => {
        ViewMediator.publish(ViewEvents.DOES_TASK_EXISTS, { projectTitle, title });
        return doesExists;
    }
})();

const doesProjectExists = (() => {
    let doesExists = true;
    ViewMediator.subscribe(ViewEvents.DOES_PROJECT_EXISTS_RESP, (projectExists) => doesExists = projectExists);

    return (projectTitle) => {
        ViewMediator.publish(ViewEvents.DOES_PROJECT_EXISTS, projectTitle);
        return doesExists;
    }
})();

const isNameSet = (name) => {
    return (name.length < 1) ? "Name must be set" : null;
}

const doesEditedTaskExists = (projectTitle, taskToEdit, title) => {
    return (title !== taskToEdit && doesTaskExists(projectTitle, title)) ? "Task already exists." : null;
}

const doesNewTaskExists = (projectTitle, title) => {
    return (doesTaskExists(projectTitle, title)) ? "Task already exists" : null;
}

const isValidDate = (dateString) => {
    const now = new Date();
    now.setHours(0);
    const dueDate = new Date(dateString);
    return (dueDate < now) ? "Date can't be set in the past." : null;
}

const doesNewProjectExists = (projectTitle) => {
    return (doesProjectExists(projectTitle)) ? "Project already exists." : null;
}

export { isNameSet, doesEditedTaskExists, doesNewTaskExists, doesNewProjectExists, isValidDate }