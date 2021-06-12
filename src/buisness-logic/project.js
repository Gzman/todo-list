import {Task} from "./task.js"

function getTask(title) { // Private function
    return this.tasks.find(task => task.title === title);
}

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTask({title, description, dueDate, priority, tags}) {
        this.tasks.push(new Task(title, description, dueDate, priority, false, tags));
    }

    removeTask(title) {
        this.tasks = this.tasks.filter(task => task.title !== title);
    }

    toggleTaskStatus(title, isComplete) {
        getTask.call(this, title)?.isComplete = isComplete;
    }

    editTask(title, {title, description, dueDate, priority, isComplete, tags}) {
        edit = getTask.call(this, title);
        if(edit) {
            if (title) edit.title = title;
            if (description) edit.description = description;
            if (dueDate) edit.dueDate = dueDate;
            if (priority) edit.priority = priority;
            if (isComplete) edit.isComplete = isComplete;
            if (tags) edit.tags = new Set(tags);
        }
    }

    addTag(title, tags) {
        getTask(this, title).addTags(tags);
    }       
}

export {Project};