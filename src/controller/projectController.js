import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"
import { Project } from "../buisness-logic/project"

const ProjectController = (() => {
    const projects = [new Project("Inbox")];

    function getProject(title) {
        return projects.find((p) => p.title === title);
    }

    ViewMediator.subscribe(ViewEvents.PROJECT_SELECTED, (title) => {
        const project = getProject(title);
        if (project) {
            const tasks = project.getTasks();
            ViewMediator.publish(ViewEvents.RENDER_PROJECT, projectTitle, tasks);
        }
    });

    ViewMediator.subscribe(ViewEvents.CREATE_PROJECT, (title) => {
        const projectAlreadyExists = getProject(title);
        if (projectAlreadyExists) {
            return;
        }
        const project = new Project(title);
        projects.push(project);
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_PROJECT, (title) => {
        projects = projects.filter((project) => project.title !== title);
    });

    ViewMediator.subscribe(ViewEvents.CREATE_TASK, (projectTitle, { title, description, dueDate, priority, tags }) => {
        getProject(projectTitle)?.addTask(title, description, dueDate, priority, tags);
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_TASK, (projectTitle, title) => {
        getProject(projectTitle)?.removeTask(title);
    });

    ViewMediator.subscribe(ViewEvents.EDIT_TASK, (projectTitle, { title, description, dueDate, priority, tags, isComplete }) => {
        getProject(projectTitle)?.editTask(title, description, dueDate, priority, tags, isComplete);
    });

    ViewMediator.subscribe(ViewEvents.EDIT_TASK_CLICKED, (title) => {
        const task = getProject(projectTitle)?.getTask(title);
        ViewMediator.publish(ViewEvents.GET_TASK, task);
    });

    // Filter

    const filterTasks = (filter) => {
        return projects.reduce((filtered, project) => {
            const tasks = project.getTasks().filter(filter);
            if (tasks) {
                filtered.push({ project: project.title, tasks });
            }
            return filtered;
        }, []);
    }

    ViewMediator.subscribe(ViewEvents.FILTER_TASK_BY_DATE, (date) => {
        const tasksOfDate = filterTasks((task) => task.dueDate === date);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, tasksOfDate);
    });

    ViewMediator.subscribe(ViewEvents.FILTER_TASK_BY_TEXT, (text) => {
        const taskFilteredByText = filterTasks((task) => tasks.title.includes(text) || task.description.includes(text) || task.priority.includes(text));
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, taskFilteredByText);
    });

    ViewMediator.subscribe(ViewEvents.FILTER_COMPLETED_TASKS, () => {
        const complteTasks = filterTasks((task) => task.isComplete);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, complteTasks);
    });

    ViewMediator.subscribe(ViewEvents.FILTER_BY_WEEK, (week) => {
        const today = new Date();
        // Calculate current week!
        const tasksOfThisWeek = filterTasks((task) => task.dueDate.getFullYear() === today.getFullYear() &&
            task.dueDate.getMonth() === today.getMonth() && task.dueDate.getDate() - today.getDate());
    });

    ViewMediator.subscribe(ViewEvents.FILTER_BY_MONTH, (month) => {
        const today = new Date();
        const tasksOfThisMonth = filterTasks((task) => task.dueDate.getFullYear() === today.getFullYear() && task.dueDate.getMonth() === today.getMonth());
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, tasksOfThisMonth);
    });

})();

export { ProjectController }