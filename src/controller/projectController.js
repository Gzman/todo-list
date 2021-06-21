import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"
import { Project } from "../buisness-logic/project.js"

const ProjectController = (() => {
    let projects = [new Project("Inbox")];

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
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_PROJECT, (title) => {
        projects = projects.filter((project) => project.title !== title);
    });

    ViewMediator.subscribe(ViewEvents.CREATE_TASK, ({ projectTitle, title, description, dueDate, priority }) => {
        getProject(projectTitle)?.addTask(title, description, dueDate, priority);
        console.log("Controller ", getProject(projectTitle));
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_TASK, (projectTitle, title) => {
        getProject(projectTitle)?.removeTask(title);
    });

    ViewMediator.subscribe(ViewEvents.EDIT_TASK, ({ projectTitle, title, description, dueDate, priority, isComplete }) => {
        getProject(projectTitle)?.editTask(title, description, dueDate, priority, isComplete);
    });

    ViewMediator.subscribe(ViewEvents.EDIT_TASK_CLICKED, ({ projectTitle, title }) => {
        const task = getProject(projectTitle)?.getTask(title);
        ViewMediator.publish(ViewEvents.GET_TASK, task);
    });

    // Filter

    const filterTasks = (filter) => {
        return projects.reduce((filtered, project) => {
            const tasks = project.getTasks().filter(filter);
            if (tasks && tasks.length >= 1) {
                filtered.push({ project: project.title, tasks });
            }
            return filtered;
        }, []);
    }

    ViewMediator.subscribe(ViewEvents.FILTER_TASK_BY_DATE, (date) => {
        const tasksOfDate = filterTasks((task) => task.dueDate === date);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: date, filtered: tasksOfDate });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_TASK_BY_TEXT, (text) => {
        if (text === "") return;
        const taskFilteredByText = filterTasks((task) => task.title.includes(text) || task.description.includes(text) || task.priority.includes(text));
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: text, filtered: taskFilteredByText });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_COMPLETED_TASKS, () => {
        const completeTasks = filterTasks((task) => task.isComplete);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: "Complete tasks", filtered: completeTasks });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_BY_WEEK, (week) => {
        const today = new Date();
        // Calculate current week!
        const tasksOfThisWeek = filterTasks((task) => {
            task.dueDate.getFullYear() === today.getFullYear()
                && task.dueDate.getMonth() === today.getMonth()
                && task.dueDate.getDate() - today.getDate();
        });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_BY_MONTH, (month) => {
        const today = new Date();
        const tasksOfThisMonth = filterTasks((task) => task.dueDate.getFullYear() === today.getFullYear() && task.dueDate.getMonth() === today.getMonth());
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: month, filtered: tasksOfThisMonth });
    });

})();