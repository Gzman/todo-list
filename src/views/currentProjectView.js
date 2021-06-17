import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"
import { createTaskItem } from "./createTaskItem.js"

(function CurrentProjectView() {
    const $content = document.querySelector(".main-view-content");

    ViewMediator.subscribe(ViewEvents.RENDER_PROJECT, (projectTitle, tasks) => {
        $content.textContent = "";
        const $ProjectView = createProjectView(projectTitle, tasks);
        $content.append($ProjectView);
    });

})();

function createProjectView(projectTitle, tasks) {
    const $taskItems = createTaskItems(projectTitle, tasks);
    const $currentProject = document.createElement("div");
    
    $currentProject.insertAdjacentHTML("beforeend", `
    <h2 class="current-project-name">${projectTitle}</h2>
    <div class="current-project-ctrls">
      <button class="current-project-create-btn">Create Task</button>
      <button class="current-project-delete-btn">Delete Project</button>
      <button class="current-project-completed-btn filter-btn">
        Completed Tasks
      </button>
      <select class="current-project-sort"></select>
    </div>
    <div class="current-project-task-items">
    </div>`);
    $currentProject.querySelector("current-project-task-items").append($taskItems);
    
    createSortSelect($taskItems);

    ViewMediator.subscribe(ViewEvents.CREATED_TASK, (projectTitle, { title, description, priority, dueDate, tags, isComplete }) => {
        const $task = createTaskItem(projectTitle, { title, description, priority, dueDate });
        $taskItems.append($task);
    });

    ViewMediator.subscribe(ViewEvents.EDIT_TASK, (projectTitle, { title, description, dueDate, isComplete }) => {
        const $task = $taskItems.find((item) => item.dataset.task === title);
        if (!$task) {
            return;
        }
        if (title) {
            $task.dataset.task = title;
            $task.querySelector(".task-item-name").textContent = title;
        }
        if (description) {
            $task.querySelector(".task-item-description").value = description;
        }
        if (priority) {
            const $prioritySelect = $task.querySelector(".task-item-priority");
            const selectedValue = $prioritySelect.options.find(option => option.text === priority).value;
            $task.querySelector(".task-item-priority").value = selectedValue;
        }
        if (dueDate) {
            $task.querySelector(".task-item-date").value = dueDate;
        }
        if (tags) {
            // Add newly created tags to task
            console.log("Add, remove new tags.", tags);
        }
        if (isComplete) {
            $task.querySelector(".task-item-complete").checked = isComplete;
        }
    });

    ViewMediator.subscribe(ViewEvents.REMOVE_TASK, (projectTitle, title) => {
        const $task = $taskItems.find((task) => task.dataset.task === title);
        $taskItems.removeChild($task);
    });

    return $currentProject;
}

function createTaskItems(projectTitle, tasks) {
    return tasks.map((task) => createTaskItem(projectTitle, task));
}

function createSortSelect($taskItems) {
    const $select = $currentProject.querySelector(".current-project-sort");
    const options = [
        { value: 1, text: "Title" },
        { value: 2, text: "Due Date" }
    ];

    $select.classList.add("current-project-sort");
    options.forEach((option) => {
        const $option = document.createElement("option");
        $option.value = option.value;
        $option.text = option.text;
        $select.add($option);
    });

    $select.addEventListener("change", (event) => {
        const selected = event.currentTarget.value;
        if (selected === "1") {
            $taskItems.sort((a, b) => {
                const atitle = a.dataset.task;
                const bTitle = b.dataset.task;
                return atitle.localeCompare(bTitle);
            });
        }
        else if (selected === "2") {
            $taskItems.sort((a, b) => {
                const aDate = new Date(a.querySelector("task-item-date").value);
                const bDate = new Date(b.querySelector(".task-item-date").value);
                return aDate - bDate;
            });
        }
    });
}