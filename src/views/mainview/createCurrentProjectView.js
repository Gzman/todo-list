import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"
import { createTaskItems } from "../task/createTaskItem"
import { createSortSelect } from "./createSortSelect"

function createProjectView(projectTitle, tasks) {
  const $projectView = document.createElement("div");
  $projectView.classList.add("current-project");
  $projectView.innerHTML = `
    <h2 class="current-project-name">${projectTitle}</h2>
    <div class="current-project-controlls">
      <button class="current-project-create-btn">Create Task</button>
      <button class="current-project-delete-btn">Delete Project</button>
      <button class="current-project-completed-btn">
        Completed Tasks
      </button>
      <select class="current-project-sort"></select>
    </div>
    <div class="current-project-task-items">
    </div>`;
  const $taskItems = $projectView.querySelector(".current-project-task-items");
  createTaskItems(projectTitle, tasks)?.forEach((item) => $taskItems.append(item));

  createSortSelect($projectView);

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
  $completedBtn.addEventListener("click", () => {
    [...$taskItems.children]
      ?.filter((item) => !item.querySelector(".task-item-complete").checked)
      .forEach((item) => $taskItems.appendChild(item));
  });

  return $projectView;
}

export { createProjectView }