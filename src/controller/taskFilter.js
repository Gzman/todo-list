import { format, getWeek } from "date-fns"

const filterTasks = (projects, filter) => {
    return projects.reduce((filtered, project) => {
        const tasks = project.getTasks().filter(filter);
        if (tasks?.length >= 1) {
            filtered.push({ project: project.title, tasks });
        }
        return filtered;
    }, []);
}

const filterByText = (projects, text) => {
    const searchText = text.toLowerCase();
    return filterTasks(projects, (task) => {
        const date = (task.dueDate) ? format(task.dueDate, "dd.MM.yyyy") : "";
        return task.title.toLowerCase().includes(searchText) || task.priority.toLowerCase() === searchText || date.includes(searchText);
    });
}

const filterComplete = (projects) => {
    return filterTasks(projects, (task) => task.isComplete);
}

const filterCritical = (projects) => {
    return filterTasks(projects, (task) => task.priority === "High");
}

const filterAll = (projects) => {
    return filterTasks(projects, (task) => task !== null);
}

const filterToday = (projects) => {
    const today = new Date();
    return filterTasks(projects, (task) => task.dueDate?.getDate() === today.getDate());
}

const filterByThisWeek = (projects) => {
    const currentWeek = getWeek(new Date());
    return filterTasks(projects, (task) => getWeek(task.dueDate) === currentWeek);
}

const filterByThisMonth = (projects) => {
    const today = new Date();
    return filterTasks(projects, (task) => task.dueDate?.getFullYear() === today.getFullYear() && task.dueDate?.getMonth() === today.getMonth());
}

export {
    filterByText,
    filterComplete,
    filterCritical,
    filterAll,
    filterToday,
    filterByThisWeek,
    filterByThisMonth,
}