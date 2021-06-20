import { Task } from "./task.js"

function findTask(title) {
    return this.tasks.find(task => task.title === title);
}

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    getTask(title) {
        const task = findTask.call(this, title);
        return { ...task };
    }

    getTasks() {
        return [...this.tasks];
    }

    addTask(title, description, dueDate, priority) {
        const taskAlreadyExists = findTask.call(this, title);
        if (!taskAlreadyExists) {
            this.tasks.push(new Task(title, description, dueDate, priority));
        }
    }

    removeTask(title) {
        this.tasks = this.tasks.filter(task => task.title !== title);
    }

    toggleTaskStatus(title, isComplete) {
        const task = findTask.call(this, title);
        if (task) task.isComplete = isComplete;
    }

    editTask(title, description, dueDate, priority, isComplete) {
        const task = findTask.call(this, title);
        if (task) {
            if (title) task.title = title;
            if (description) task.description = description;
            if (dueDate) task.dueDate = dueDate;
            if (priority) task.priority = priority;
            task.isComplete = isComplete;
        }
    }

    addTag(title, tags) {
        findTask.call(this, title).addTags(tags);
    }
}

export { Project };