import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"
import { Project } from "../buisness-logic/project"

const ProjectController = (() => {
    const inbox = new Project("Inbox");
    const projects = [inbox];
    let currentProject;

    ViewMediator.subscribe(ViewEvents.SELECT_PROJECT, (title) => {
        const selected = projects.find((project) => project.title === title);
        currentProject = selected? selected : currentProject;
    });

    ViewMediator.subscribe(ViewEvents.CREATE_PROJECT, (title) => {
        const projectAlreadyExists = projects.every((project) => project.title !== title);
        if (projectAlreadyExists) {
            return;
        }
        const project = new Project(title);
        projects.push(project);
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_PROJECT, (title) => {
        projects = projects.filter((project) => project.title !== title);
    });

    ViewMediator.subscribe(ViewEvents.CREATE_TASK, ({ title, description, dueDate, priority, tags }) => {
        currentProject.addTask(title, description, dueDate, priority, tags);
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_TASK, (title) => {
        currentProject.removeTask(title);
    });

    ViewMediator.subscribe(ViewEvents.EDIT_TASK, ({ title, description, dueDate, priority, tags, isComplete }) => {
        currentProject.editTask(title, description, dueDate, priority, tags, isComplete);
    });

    ViewEvents.subscribe(ViewEvents.ADD_TAGS_TASK, (title, tags) => {
        currentProject.addTag(title, tags);
    });

})();

export { ProjectController }