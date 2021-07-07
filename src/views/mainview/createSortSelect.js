import { getPriorityWeight, taskPriorities } from "../task/taskPriorities"
import { DATE_FORMAT } from "../util";
import { parse } from "date-fns";

function createSortSelect($ProjectView) {
    const $taskItems = $ProjectView.querySelector(".current-project-task-items");
    const $select = $ProjectView.querySelector(".current-project-sort");
    const options = [
        { value: 0, text: "Choose.." },
        { value: 1, text: "Title" },
        { value: 2, text: "Due Date" },
        { value: 3, text: "Priority" },
    ];

    options.forEach((option) => {
        const $option = document.createElement("option");
        $option.value = option.value;
        $option.text = option.text;
        $select.add($option);
    });

    const sortAfterDate = (a, b) => {
        const isValidDate = (dueDate) => !isNaN(dueDate.getTime());
        const aFormatted = a.querySelector(".task-item-date")?.textContent;
        const bFormatted = b.querySelector(".task-item-date")?.textContent;
        const aDate = parse(aFormatted, DATE_FORMAT, new Date());
        const bDate = parse(bFormatted, DATE_FORMAT, new Date());
        if (!isValidDate(aDate)) return 1;
        if (!isValidDate(bDate)) return -1;
        return aDate - bDate;
    }

    const sortAfterPriority = (a, b) => {
        const aPriority = taskPriorities.find((priority) => a.classList.contains(`priority-${priority}`));
        const bPriority = taskPriorities.find((priority) => b.classList.contains(`priority-${priority}`));
        return getPriorityWeight(bPriority) - getPriorityWeight(aPriority);
    }

    const sortAfterTitle = (a, b) => {
        const aTitle = a.querySelector(".task-item-name")?.textContent;
        const bTitle = b.querySelector(".task-item-name")?.textContent;
        return aTitle?.localeCompare(bTitle);
    }

    const sortTaskItems = (sortAfter) => {
        [...$taskItems.children]
            ?.sort(sortAfter)
            .forEach((item) => $taskItems.appendChild(item));
    }

    $select.addEventListener("change", (event) => {
        const selected = event.currentTarget.value;
        if (selected === "1") sortTaskItems(sortAfterTitle);
        if (selected === "2") sortTaskItems(sortAfterDate);
        if (selected === "3") sortTaskItems(sortAfterPriority);
    });
}

export { createSortSelect }