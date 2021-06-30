import { ViewEvents, ViewMediator } from "../mediator/viewMediator"
import { StorageEvents, StorageMediator } from "../mediator/storageMediator"
import { Project } from "../buisness-logic/project"
import { createExampleProjects } from "./exampleProject"
import { filterByText, filterCritical, filterComplete, filterAll, filterToday, filterByThisWeek, filterByThisMonth } from "./taskFilter"

const inbox = new Project("Inbox");
let projects = [inbox];

// Load stored projects into memory
StorageMediator.subscribe(StorageEvents.GET_STORED_PROJECTS_RESP, loadStoredProjects);
StorageMediator.publish(StorageEvents.GET_STORED_PROJECTS, null);
ViewMediator.subscribe(ViewEvents.GET_PROJECTS, passStoredProjectsToView);

// Create, remove and edit projects, tasks
ViewMediator.subscribe(ViewEvents.GET_PROJECT, passProjectToView);
ViewMediator.subscribe(ViewEvents.CREATE_PROJECT, createProject);
ViewMediator.subscribe(ViewEvents.REMOVE_PROJECT, removeProject);
ViewMediator.subscribe(ViewEvents.CREATE_TASK, createTask);
ViewMediator.subscribe(ViewEvents.REMOVE_TASK, removeTask);
ViewMediator.subscribe(ViewEvents.EDIT_TASK, editTask);
ViewMediator.subscribe(ViewEvents.GET_TASK, getTask);
ViewMediator.subscribe(ViewEvents.DOES_PROJECT_EXISTS, doesProjectExists);
ViewMediator.subscribe(ViewEvents.DOES_TASK_EXISTS, doesTaskExists);
ViewMediator.subscribe(ViewEvents.GET_TASK_COUNT, getTaskCount);

// Filter tasks
ViewMediator.subscribe(ViewEvents.FILTER_TASK_BY_TEXT, (text) => filterTasks(`Search: ${text}`, filterByText, text));
ViewMediator.subscribe(ViewEvents.FILTER_COMPLETED_TASKS, () => filterTasks("Complete Tasks", filterComplete));
ViewMediator.subscribe(ViewEvents.FILTER_CRITICAL_TASKS, () => filterTasks("Critical Tasks", filterCritical));
ViewMediator.subscribe(ViewEvents.FILTER_ALL_TASKS, () => filterTasks("All Tasks", filterAll));
ViewMediator.subscribe(ViewEvents.FILTER_TASK_TODAY, (today) => filterTasks(today, filterToday));
ViewMediator.subscribe(ViewEvents.FILTER_BY_WEEK, (week) => filterTasks(week, filterByThisWeek));
ViewMediator.subscribe(ViewEvents.FILTER_BY_MONTH, (month) => filterTasks(month, filterByThisMonth));

function convertStringifiedProjects(stringified) {
    const converted = stringified?.map((project) => Object.assign(new Project(), project));
    converted?.forEach((project) => project?.tasks
        .forEach((task) => {
            if (task.dueDate) task.dueDate = new Date(task.dueDate);
        })
    );
    return converted;
}

function loadStoredProjects(savedProjects) {
    const saved = convertStringifiedProjects(savedProjects);
    const savedInbox = saved?.find((project) => project.title === inbox.title);
    if (saved?.length > 0 && savedInbox.getTasks().length > 0) {
        projects = saved;
    } else {
        const exampleProjects = createExampleProjects();
        projects = [...projects, ...exampleProjects];
    }
}

function passStoredProjectsToView() {
    const projectTitles = projects.filter(project => project.title !== inbox.title).map(project => project.title);
    ViewMediator.publish(ViewEvents.GET_PROJECTS_RESP, projectTitles);
}

function getProject(title) {
    return projects.find((p) => p.title === title);
}

function passProjectToView(title) {
    const project = getProject(title);
    if (project) {
        const tasks = project.getTasks();
        ViewMediator.publish(ViewEvents.GET_PROJECT_RESP, { projectTitle: project.title, tasks });
    }
}

function createProject(title) {
    const projectAlreadyExists = getProject(title);
    if (projectAlreadyExists) return;
    projects.push(new Project(title));
    StorageMediator.publish(StorageEvents.SAVE_PROJECTS, projects);
}

function removeProject(title) {
    projects = projects.filter((project) => project.title !== title);
    StorageMediator.publish(StorageEvents.UPDATE_PROJECTS, projects);
}

function createTask({ projectTitle, title, description, dueDate, priority }) {
    getProject(projectTitle)?.addTask(title, description, dueDate, priority);
    StorageMediator.publish(StorageEvents.UPDATE_PROJECTS, projects);
}

function removeTask({ projectTitle, title }) {
    getProject(projectTitle)?.removeTask(title);
    StorageMediator.publish(StorageEvents.UPDATE_PROJECTS, projects);
}

function editTask({ projectTitle, taskToEdit, title, description, dueDate, priority, isComplete }) {
    getProject(projectTitle)?.editTask(taskToEdit, title, description, dueDate, priority, isComplete);
    StorageMediator.publish(StorageEvents.UPDATE_PROJECTS, projects);
}

function getTask({ projectTitle, title }) {
    const task = getProject(projectTitle)?.getTask(title);
    ViewMediator.publish(ViewEvents.GET_TASK_RESP, { projectTitle, task });
}

function doesProjectExists(projectTitle) {
    const projectExists = getProject(projectTitle) ? true : false;
    ViewMediator.publish(ViewEvents.DOES_PROJECT_EXISTS_RESP, projectExists);
}

function doesTaskExists({ projectTitle, title }) {
    const taskExists = (getProject(projectTitle)?.getTask(title)) ? true : false;
    ViewMediator.publish(ViewEvents.DOES_TASK_EXISTS_RESP, taskExists);
}

function getTaskCount(projectTitle) {
    const count = getProject(projectTitle).tasks.length;
    ViewMediator.publish(ViewEvents.GET_TASK_COUNT_RESP, { projectTitle, taskCount: count });
}

function filterTasks(filterName, filter, filterArg) {
    const result = filter(projects, filterArg);
    ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: filterName, filtered: result });
}
