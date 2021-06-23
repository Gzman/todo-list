import { ViewEvents, ViewMediator } from "../../mediator/viewMediator";
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
  $isComplete.addEventListener("change", (event) => ViewMediator.publish(ViewEvents.EDIT_TASK, {
    projectTitle: $taskItem.dataset.project,
    taskToEdit: $taskItem.dataset.task,
    title: $taskItem.dataset.task,
    description,
    priority,
    dueDate,
    isComplete: event.currentTarget.checked
  }));

  const $name = document.createElement("p");
  $name.classList.add("task-item-name");
  $name.textContent = title;

  const $controlls = document.createElement("div");
  $controlls.classList.add("task-item-controlls");

  const $removeBtn = document.createElement("button");
  $removeBtn.classList.add("task-item-delete");
  $removeBtn.textContent = "Delete";
  $removeBtn.addEventListener("click", () => {
    ViewMediator.publish(ViewEvents.REMOVE_TASK, { projectTitle: $taskItem.dataset.project, title: $taskItem.dataset.task });
    $taskItem.remove();
  });

  const $editBtn = document.createElement("button");
  $editBtn.classList.add("task-item-edit");
  $editBtn.textContent = "Edit";
  $editBtn.addEventListener("click", () => {
    document.querySelector(".edit-task-container").classList.add("showItem");
    ViewMediator.publish(ViewEvents.EDIT_TASK_CLICKED, { projectTitle: $taskItem.dataset.project, title: $taskItem.dataset.task });
  });

  $controlls.append($editBtn, $removeBtn);

  $taskItem.classList.add(`priority-${priority.toLowerCase()}`);

  const $dueDate = document.createElement("input");
  $dueDate.classList.add("task-item-date");
  $dueDate.type = "date";
  if (dueDate) $dueDate.value = format(dueDate, "yyyy-MM-dd");
  $dueDate.readOnly = true;

  $taskItem.append($isComplete, $name, $controlls, $dueDate);

  ViewMediator.subscribe(ViewEvents.EDIT_TASK, ({ projectTitle, taskToEdit, title, dueDate, priority }) => {
    if (!($taskItem.dataset.project === projectTitle && $taskItem.dataset.task === taskToEdit)) {
      return;
    }
    if (title) {
      $taskItem.dataset.task = title;
      $name.textContent = title;
    }
    if (priority) {
      const priorities = ["low", "medium", "high"];
      priorities.forEach((priority) => $taskItem.classList.remove(`priority-${priority.toLowerCase()}`));
      $taskItem.classList.add(`priority-${priority.toLowerCase()}`);
    }
    if (dueDate) {
      $dueDate.value = format(dueDate, "yyyy-MM-dd");
    }
  });

  return $taskItem;
}

function createTaskItems(projectTitle, tasks) {
  return tasks?.map((task) => createTaskItem(projectTitle, task));
}

/*function createExtendView(description) {
    const $div = document.createElement("div");
    const $textArea = document.createElement("textarea");
    $textArea.readOnly = true;
    $textArea.style.display = "none";
    $textArea.rows = 5;
    $textArea.value = description;
    return $textArea;
}*/

export { createTaskItem, createTaskItems };
