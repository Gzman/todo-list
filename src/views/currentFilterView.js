import { ViewEvents, ViewMediator } from "../mediator/viewMediator.js"
import { createProjectItem } from "./createProjectItem.js"
import { createTaskItems } from "./createTaskItem.js"

(function CurrentFilterView() {
    const $content = document.querySelector(".main-view-content");

    const createFilterItems = (filteredProjects) => {
        const $filterItems = document.createElement("div");
        $filterItems.classList.add("current-filter-items");
        filteredProjects.forEach((item) => {
            const $project = createProjectItem(item.project);
            const $taskItems = createTaskItems(item.project, item.tasks);
            const $filterItem = document.createElement("div");
            $filterItem.classList.add("filter-item");
            $filterItem.append($project, ...$taskItems);
            $filterItems.append($filterItem);
        });
        return $filterItems;
    }

    const createFilterView = (filter, filtered) => {
        const $filterView = document.createElement("div");
        $filterView.classList.add("current-filter");

        const $filterName = document.createElement("p");
        $filterName.textContent = filter;

        const $filterItems = createFilterItems(filtered);

        if (filtered.length === 0) {
            const $message = document.createElement("p");
            $message.textContent = "There are no tasks";
            $filterView.append($filterName, $filterItems, $message);
        } else {
            $filterView.append($filterName, $filterItems);
        }

        $content.textContent = "";
        $content.append($filterView);
    }

    ViewMediator.subscribe(ViewEvents.GET_FILTERED_TASKS, ({ filter, filtered }) => createFilterView(filter, filtered));
})();
