
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
        const aDate = new Date(a.querySelector(".task-item-date")?.value);
        const bDate = new Date(b.querySelector(".task-item-date")?.value);
        if (!isValidDate(aDate)) return 1;
        if (!isValidDate(bDate)) return -1;
        return aDate - bDate;
    }

    const sortAfterPriority = (a, b) => {
        const priorities = ["low", "medium", "high"];
        const aPriority = priorities.filter((p) => a.classList.contains(`priority-${p}`));
        const bPriority = priorities.filter((p) => b.classList.contains(`priority-${p}`));
        const pWeight = {
            "low": 1,
            "medium": 2,
            "high": 3,
        }
        return pWeight[bPriority] - pWeight[aPriority];
    }

    const sortAfterTitle = (a, b) => {
        const aTitle = a.querySelector(".task-item-name")?.textContent;
        const bTitle = b.querySelector(".task-item-name")?.textContent;
        return aTitle?.localeCompare(bTitle);
    }

    const sortTaskItems = (sortAfter) => {
        const sorted = [...$taskItems.children]?.sort(sortAfter);
        $taskItems.textContent = "";
        sorted.forEach((item) => $taskItems.append(item));
    }

    $select.addEventListener("change", (event) => {
        const selected = event.currentTarget.value;
        if (selected === "1") sortTaskItems(sortAfterTitle);
        if (selected === "2") sortTaskItems(sortAfterDate);
        if (selected === "3") sortTaskItems(sortAfterPriority);
    });
}

export { createSortSelect }