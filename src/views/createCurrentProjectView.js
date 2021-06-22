import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"
import { createTaskItem, createTaskItems } from "./createTaskItem.js"

function createProjectView(projectTitle, tasks) {
    const $projectView = document.createElement("div");
    $projectView.classList.add("current-project");
    $projectView.innerHTML = `
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
    </div>`;
    const $taskItems = $projectView.querySelector(".current-project-task-items");
    createTaskItems(projectTitle, tasks)?.forEach((item) => $taskItems.append(item));

    SortSelect($projectView);

    const $createBtn = $projectView.querySelector(".current-project-create-btn");
    $createBtn.addEventListener("click", () => document.querySelector(".new-task-container").classList.add("showItem"));

    const $deleteBtn = $projectView.querySelector(".current-project-delete-btn");
    $deleteBtn.addEventListener("click", () => {
        const isInbox = projectTitle === document.querySelector(".projects-inbox-btn").textContent;
        if (isInbox) {
            alert("Inbox can't be deleted.");
            return;
        }
        document.querySelector(".main-view-content").removeChild($projectView);
        ViewMediator.publish(ViewEvents.REMOVE_PROJECT, projectTitle);
    });

    const $completedBtn = $projectView.querySelector(".current-project-completed-btn");
    $completedBtn.addEventListener("click", (event) => {
        [...$taskItems.children]
            ?.filter((item) => item.querySelector(".task-item-complete").checked)
            .forEach((item) => $taskItems.appendChild(item));
    });

    ViewMediator.subscribe(ViewEvents.CREATE_TASK, ({ projectTitle, title, description, priority, dueDate }) => {
        const $task = createTaskItem(projectTitle, { title, description, priority, dueDate });
        $taskItems.append($task);
    });

    return $projectView;
}

function SortSelect($currentProject) {
    const $taskItems = $currentProject.querySelector(".current-project-task-items");
    const $select = $currentProject.querySelector(".current-project-sort");
    const options = [
        { value: 0, text: "Title" },
        { value: 1, text: "Due Date" }
    ];

    options.forEach((option) => {
        const $option = document.createElement("option");
        $option.value = option.value;
        $option.text = option.text;
        $select.add($option);
    });

    const sortTaskItems = (sortAfter) => {
        const sorted = [...$taskItems.children]?.sort(sortAfter);
        $taskItems.textContent = "";
        sorted.forEach((item) => $taskItems.append(item));
    }

    $select.addEventListener("change", (event) => {
        const selected = event.currentTarget.value;
        if (selected === "1") {
            sortTaskItems((a, b) => {
                const atitle = a.dataset.task;
                const bTitle = b.dataset.task;
                return atitle.localeCompare(bTitle);
            });
        }
        else if (selected === "2") {
            sortTaskItems((a, b) => {
                const aDate = new Date(a.querySelector("task-item-date").value);
                const bDate = new Date(b.querySelector(".task-item-date").value);
                return aDate - bDate;
            });
        }
    });
}

export { createProjectView }