import { ViewEvents, ViewMediator } from "../mediator/viewMediator"
import { Project } from "../buisness-logic/project"
import { getWeek, format } from "date-fns"

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
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_TASK, ({ projectTitle, title }) => {
        getProject(projectTitle)?.removeTask(title);
    });

    ViewMediator.subscribe(ViewEvents.EDIT_TASK, ({ projectTitle, taskToEdit, title, description, dueDate, priority, isComplete }) => {
        getProject(projectTitle)?.editTask(taskToEdit, title, description, dueDate, priority, isComplete);
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

    // Filter

    const filterTasks = (filter) => {
        return projects.reduce((filtered, project) => {
            const tasks = project.getTasks().filter(filter);
            if (tasks?.length >= 1) {
                filtered.push({ project: project.title, tasks });
            }
            return filtered;
        }, []);
    }

    ViewMediator.subscribe(ViewEvents.FILTER_TASK_TODAY, (date) => {
        const today = new Date();
        const tasksOfDate = filterTasks((task) => task.dueDate?.getDate() === today.getDate());
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: date, filtered: tasksOfDate });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_TASK_BY_TEXT, (text) => {
        const searchText = text.toLowerCase();
        const taskFilteredByText = filterTasks((task) => {
            const date = (task.dueDate) ? format(task.dueDate, "dd.MM.yyyy") : "";
            return task.title.toLowerCase().includes(searchText) || task.priority.toLowerCase() === searchText || date.includes(searchText);
        });
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: `Search: ${text}`, filtered: taskFilteredByText });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_COMPLETED_TASKS, () => {
        const completeTasks = filterTasks((task) => task.isComplete);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: "Complete tasks", filtered: completeTasks });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_CRITICAL_TASKS, () => {
        const criticalTasks = filterTasks((task) => task.priority === "High");
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: "Critical tasks", filtered: criticalTasks });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_ALL_TASKS, () => {
        const allTasks = filterTasks((task) => task !== null);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: "All tasks", filtered: allTasks });
    })

    ViewMediator.subscribe(ViewEvents.FILTER_BY_WEEK, (week) => {
        const currentWeek = getWeek(new Date());
        const tasksOfThisWeek = filterTasks((task) => getWeek(task.dueDate) === currentWeek);
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: week, filtered: tasksOfThisWeek });
    });

    ViewMediator.subscribe(ViewEvents.FILTER_BY_MONTH, (month) => {
        const today = new Date();
        const tasksOfThisMonth = filterTasks((task) => task.dueDate?.getFullYear() === today.getFullYear() && task.dueDate?.getMonth() === today.getMonth());
        ViewMediator.publish(ViewEvents.GET_FILTERED_TASKS, { filter: month, filtered: tasksOfThisMonth });
    });

})();