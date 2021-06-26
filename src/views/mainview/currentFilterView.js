import { ViewEvents, ViewMediator } from "../../mediator/viewMediator"
import { createProjectItem } from "../project/createProjectItem"
import { createTaskItems } from "../task/createTaskItem"

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

        const $filterName = document.createElement("h2");
        $filterName.classList.add("current-filter-name");
        $filterName.textContent = filter;

        const $filterItems = createFilterItems(filtered);

        if (filtered.length === 0) {
            const $message = document.createElement("p");
            $message.classList.add("current-filter-message");
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
