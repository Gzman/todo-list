import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js";

function createTaskItem(
  projectTitle,
  { title, description, priority, dueDate, isComplete }
) {
  const $taskItem = document.createElement("div");
  $taskItem.classList.add("task-item");
  $taskItem.dataset.project = projectTitle;
  $taskItem.dataset.task = title;

  const $inputComplete = document.createElement("input");
  $inputComplete.type = "checkbox";
  $inputComplete.classList.add("task-item-complete");
  $inputComplete.checked = isComplete;

  const $taskName = document.createElement("p");
  $taskName.classList.add("task-item-name");
  $taskName.textContent = title;

  const $taskCtrls = document.createElement("div");
  $taskCtrls.classList.add("task-ctrls");
  const $taskRemoveBtn = document.createElement("button");
  $taskEditBtn.classList.add("task-item-edit");
  const $taskEditBtn = document.createElement("button");
  $taskRemoveBtn.classList.add("task-item-delete");
  $taskEditBtn.addEventListener("click", () => {
    document.querySelector(".edit-task-container").classList.add("showItem");
    ViewMediator.publish(ViewEvents.EDIT_TASK_CLICKED, title);
  });
  $taskRemoveBtn.addEventListener("click", () => {
    ViewMediator.publish(ViewEvents.REMOVE_TASK, projectTitle, title);
    $taskItem.remove();
  });
  $taskCtrls.append($taskEditBtn, $taskRemoveBtn);

  $taskItem.classList.add(`priority-${priority.toLowerCase()}`);

  const $taskDate = document.createElement("input");
  $taskDate.type = "date";
  $taskDate.readOnly = true;
  $taskDate.value = dueDate;

  $taskItem.append($inputComplete, $taskName, $taskCtrls, $taskDate);
  return $taskItem;
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

export { createTaskItem };
