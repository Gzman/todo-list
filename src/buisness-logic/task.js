class Task {
  constructor(title, description, dueDate, priority, tags = new Set(), isComplete = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.tags = tags;
    this.isComplete = isComplete;
  }

  set tags(value) {
    this._tags = new Set(value);
  }

  get tags() {
    return this._tags;
  }

  addTags(tags) {
    this.tags = new Set(...this.tags, ...tags);
  }

  removeTags(tags) {
    tags.forEach((tag) => this.tags.remove(tag));
  }
}

export { Task };
