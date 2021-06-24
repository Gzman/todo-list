const taskPriorities = ["Low", "Medium", "High"];
const getPriorityWeight = (priority) => taskPriorities.indexOf(priority);

export { taskPriorities, getPriorityWeight }