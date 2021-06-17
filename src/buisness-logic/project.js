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
        return {...task};
    }

    getTasks() {
        return [...this.tasks];
    }

    addTask({ title, description, dueDate, priority, tags }) {
        const taskAlreadyExists = findTask.call(this, title);
        if (!taskAlreadyExists) {
            this.tasks.push(new Task(title, description, dueDate, priority, tags));
        }
    }

    removeTask(title) {
        this.tasks = this.tasks.filter(task => task.title !== title);
    }

    toggleTaskStatus(title, isComplete) {
        findTask.call(this, title)?.isComplete = isComplete;
    }

    editTask(title, { title, description, dueDate, priority, tags, isComplete }) {
        const task = findTask.call(this, title);
        if (task) {
            if (title) task.title = title;
            if (description) task.description = description;
            if (dueDate) task.dueDate = dueDate;
            if (priority) task.priority = priority;
            if (tags) task.tags = new Set(tags);
            if (isComplete) task.isComplete = isComplete;
        }
    }

    addTag(title, tags) {
        findTask.call(this, title).addTags(tags);
    }
}

export { Project };