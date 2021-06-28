import { ViewEvents, ViewMediator } from "../mediator/viewMediator"
import { StorageEvents, StorageMediator } from "../mediator/storageMediator"
import { Project } from "../buisness-logic/project"
import {
    filterByText,
    filterCriticalTasks,
    filterCompleteTasks,
    filterAllTasks,
    filterTasksToday,
    filterTasksByThisWeek,
    filterTasksByThisMonth
} from "./taskFilter"

const convertStringifiedProjects = (projects) => {
    const deserialized = projects.map((project) => Object.assign(new Project(), project));
    deserialized.forEach((project) => project.tasks
        .forEach((task) => {
            if (task.dueDate) task.dueDate = new Date(task.dueDate);
        })
    );
    return deserialized;
}

const ProjectController = (() => {
    let projects = [new Project("Inbox")];

    // Loading saved projects
    StorageMediator.subscribe(StorageEvents.GET_PROJECTS, ({ savedProjects }) => {
        if (savedProjects?.length > 0) {
            projects = convertStringifiedProjects(savedProjects);
        }
    });
    StorageMediator.publish(StorageEvents.LOAD_PROJECTS, null);

    ViewMediator.subscribe(ViewEvents.PROJECTS_AVAILABLE, () => {
        const projectTitles = projects.filter(project => project.title !== "Inbox").map(project => project.title);
        ViewMediator.publish(ViewEvents.PROJECTS_LOADED, { projects: projectTitles });
    });

    // CRUD projects
    function getProject(title) {
        return projects.find((p) => p.title === title);
    }

    ViewMediator.subscribe(ViewEvents.PROJECT_SELECTED, (title) => {
        const project = getProject(title);
        if (project) {
            const tasks = project.getTasks();
            ViewMediator.publish(ViewEvents.RENDER_PROJECT, { projectTitle: project.title, tasks });
        }
    });

    ViewMediator.subscribe(ViewEvents.CREATE_PROJECT, (title) => {
        const projectAlreadyExists = getProject(title);
        if (projectAlreadyExists) return;
        const project = new Project(title);
        projects.push(project);
        StorageMediator.publish(StorageEvents.SAVE_PROJECTS, projects);
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_PROJECT, (title) => {
        projects = projects.filter((project) => project.title !== title);
        StorageMediator.publish(StorageEvents.UPDATE_PROJECTS, projects);
    });

    ViewMediator.subscribe(ViewEvents.CREATE_TASK, ({ projectTitle, title, description, dueDate, priority }) => {
        getProject(projectTitle)?.addTask(title, description, dueDate, priority);
        StorageMediator.publish(StorageEvents.UPDATE_PROJECTS, projects);
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_TASK, ({ projectTitle, title }) => {
        getProject(projectTitle)?.removeTask(title);
        StorageMediator.publish(StorageEvents.UPDATE_PROJECTS, projects);
    });

    ViewMediator.subscribe(ViewEvents.EDIT_TASK, ({ projectTitle, taskToEdit, title, description, dueDate, priority, isComplete }) => {
        getProject(projectTitle)?.editTask(taskToEdit, title, description, dueDate, priority, isComplete);
        StorageMediator.publish(StorageEvents.UPDATE_PROJECTS, projects);
    });

    ViewMediator.subscribe(ViewEvents.EDIT_TASK_CLICKED, ({ projectTitle, title }) => {
        const task = getProject(projectTitle)?.getTask(title);
        ViewMediator.publish(ViewEvents.GET_TASK, { projectTitle, task });
    });

    ViewMediator.subscribe(ViewEvents.DOES_PROJECT_EXISTS, (projectTitle) => {
        const projectExists = getProject(projectTitle) ? true : false;
        ViewMediator.publish(ViewEvents.PROJECT_EXISTS, projectExists);
    });

    ViewMediator.subscribe(ViewEvents.DOES_TASK_EXISTS, ({ projectTitle, title }) => {
        const taskExists = (getProject(projectTitle)?.getTask(title)) ? true : false;
        ViewMediator.publish(ViewEvents.TASK_EXISTS, taskExists);
    });

    // Task filtering
    ViewMediator.subscribe(ViewEvents.FILTER_TASK_BY_TEXT, (text) => {
        const tasks = filterByText(projects, text);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: `Search: ${text}`, filtered: tasks });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_COMPLETED_TASKS, () => {
        const tasks = filterCompleteTasks(projects);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: "Complete Tasks", filtered: tasks });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_CRITICAL_TASKS, () => {
        const tasks = filterCriticalTasks(projects);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: "Critical Tasks", filtered: tasks });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_ALL_TASKS, () => {
        const tasks = filterAllTasks(projects);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: "All Tasks", filtered: tasks });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_TASK_TODAY, (today) => {
        const tasks = filterTasksToday(projects);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: today, filtered: tasks });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_BY_WEEK, (week) => {
        const tasks = filterTasksByThisWeek(projects);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: week, filtered: tasks });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_BY_MONTH, (month) => {
        const tasks = filterTasksByThisMonth(projects);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: month, filtered: tasks });
    });

})();