import { ViewEvents, ViewMediator } from "../../mediator/viewMediator";
import { taskPriorities } from "./taskPriorities";
import { DATE_FORMAT } from "../util";
import { format } from "date-fns";

function createTaskItem(projectTitle, { title, description, priority, dueDate, isComplete }) {
  const $taskItem = document.createElement("div");
  $taskItem.classList.add("task-item");
  $taskItem.dataset.project = projectTitle;
  $taskItem.dataset.task = title;

  const $isComplete = document.createElement("input");
  $isComplete.type = "checkbox";
  $isComplete.classList.add("task-item-complete");
  $isComplete.checked = isComplete;
  if (isComplete) $taskItem.classList.add("itemComplete");
  $isComplete.addEventListener("change", (event) => {
    $taskItem.classList.toggle("itemComplete");
    ViewMediator.publish(ViewEvents.EDIT_TASK, {
      projectTitle: $taskItem.dataset.project,
      taskToEdit: $taskItem.dataset.task,
      title: $taskItem.dataset.task,
      description: $description.textContent,
      priority: extractPriority($taskItem),
      dueDate: ($dueDate.value) ? new Date($dueDate.value) : null,
      isComplete: event.currentTarget.checked
    });
  });

  const $name = document.createElement("p");
  $name.classList.add("task-item-name");
  $name.textContent = title;

  const $description = document.createElement("p");
  $description.classList.add("task-item-description");
  $description.textContent = description;

  const $dueDate = document.createElement("p");
  $dueDate.classList.add("task-item-date");
  if (dueDate) $dueDate.textContent = format(dueDate, DATE_FORMAT);

  const $removeBtn = document.createElement("button");
  $removeBtn.classList.add("task-item-delete");
  $removeBtn.textContent = "Delete";
  $removeBtn.addEventListener("click", () => {
    ViewMediator.publish(ViewEvents.REMOVE_TASK, { projectTitle: $taskItem.dataset.project, title: $taskItem.dataset.task });
    ViewMediator.unsubscribe(ViewEvents.EDIT_TASK, editTask);
    $taskItem.remove();
  });

  const $editBtn = document.createElement("button");
  $editBtn.classList.add("task-item-edit");
  $editBtn.textContent = "Edit";
  $editBtn.addEventListener("click", () => {
    document.querySelector(".edit-task-container").classList.add("showItem");
    ViewMediator.publish(ViewEvents.GET_TASK, { projectTitle: $taskItem.dataset.project, title: $taskItem.dataset.task });
  });

  const $controlls = document.createElement("div");
  $controlls.classList.add("task-item-controlls");
  $controlls.append($editBtn, $removeBtn);

  $taskItem.classList.add(`priority-${priority}`);

  const $normalView = document.createElement("div");
  $normalView.classList.add("task-item-normal-view");
  $normalView.append($isComplete, $name, $dueDate, $controlls);

  const $detailView = document.createElement("div");
  $detailView.classList.add("task-item-detail-view", "hideItem");
  $detailView.append($description);
  $name.addEventListener("click", () => {
    if ($description.textContent !== "") $detailView.classList.toggle("hideItem")
  });

  $taskItem.append($normalView, $detailView);

  function editTask({ projectTitle, taskToEdit, title, description, dueDate, priority }) {
    if (!($taskItem.dataset.project === projectTitle && $taskItem.dataset.task === taskToEdit)) {
      return;
    }
    if (title) {
      $taskItem.dataset.task = title;
      $name.textContent = title;
    }
    if (description) {
      $description.textContent = description;
    }
    if (priority) {
      taskPriorities.forEach((priority) => $taskItem.classList.remove(`priority-${priority}`));
      $taskItem.classList.add(`priority-${priority}`);
    }
    if (dueDate) {
      $dueDate.textContent = format(dueDate, DATE_FORMAT);
    }
  }

  ViewMediator.subscribe(ViewEvents.EDIT_TASK, editTask);

  return $taskItem;
}

function createTaskItems(projectTitle, tasks) {
  return tasks?.map((task) => createTaskItem(projectTitle, task));
}

function extractPriority($taskItem) {
  return taskPriorities.find((priority) => $taskItem.className.includes(priority));
}

export { createTaskItem, createTaskItems };
