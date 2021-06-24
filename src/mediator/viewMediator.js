import { PubSub } from "./pubsub.js"

const ViewEvents = {
    PROJECT_SELECTED: "ProjectSelected",
    RENDER_PROJECT: "RenderProject",
    CREATE_PROJECT: "CreateProject",
    REMOVE_PROJECT: "RemoveProject",
    CREATE_TASK: "CreateTask",
    REMOVE_TASK: "RemoveTask",
    EDIT_TASK: "EditTask",
    GET_TASK: "GetTask",
    
    DOES_PROJECT_EXISTS: "DoesProjectExists",
    DOES_TASK_EXISTS: "DoesTaskExists",
    PROJECT_EXISTS: "ProjectExists",
    TASK_EXISTS: "TaskExists",

    GET_FILTERED_TASKS: "GetFilteredTasks",
    FILTER_TASK_BY_TEXT: "FilterTasks",
    FILTER_COMPLETED_TASKS: "FilterCompletedTasks",
    FILTER_TASK_TODAY: "FilterTaskByDate",
    FILTER_BY_WEEK: "FilterByWeek",
    FILTER_BY_MONTH: "FilterByMonth"
}

const ViewMediator = PubSub();

export { ViewEvents, ViewMediator }
