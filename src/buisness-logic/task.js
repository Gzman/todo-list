class Task {
  constructor(title, description, dueDate, priority, isComplete = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
  }
}

export { Task };
