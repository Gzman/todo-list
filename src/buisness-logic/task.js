
class Task {
    constructor(title, description, dueDate, priority, isComplete = false, tags = new Set()) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete;
        this.tags = tags;
    }

    addTags(tags) {
        this.tags = new Set(...this.tags, ...tags);
    }

    removeTags(tags) {
        tags.forEach(tag => this.tags.remove(tag)); 
    }
}

export {Task}