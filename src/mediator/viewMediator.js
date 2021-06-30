import { PubSub } from "./pubsub.js"

const ViewEvents = {
    GET_PROJECTS_RESP: "GetProjectsResponse",
    GET_PROJECTS: "GetProjects",

    GET_PROJECT: "GetProject",
    GET_PROJECT_RESP: "GetProjectResponse",
    CREATE_PROJECT: "CreateProject",
    REMOVE_PROJECT: "RemoveProject",

    GET_TASK_COUNT: "GetTaskCount",
    GET_TASK_COUNT_RESP: "GetTaskCountResponse",

    GET_TASK: "GetTask",
    GET_TASK_RESP: "GetTaskResponse",
    CREATE_TASK: "CreateTask",
    REMOVE_TASK: "RemoveTask",
    EDIT_TASK: "EditTask",

    DOES_PROJECT_EXISTS: "DoesProjectExists",
    DOES_TASK_EXISTS: "DoesTaskExists",
    DOES_PROJECT_EXISTS_RESP: "DoesProjectExistsResponse",
    DOES_TASK_EXISTS_RESP: "DoesTaskExistsResponse",

    GET_FILTERED_TASKS: "GetFilteredTasks",
    FILTER_TASK_BY_TEXT: "FilterTasks",
    FILTER_COMPLETED_TASKS: "FilterCompletedTasks",
    FILTER_CRITICAL_TASKS: "FilterCriticalTasks",
    FILTER_ALL_TASKS: "FilterAllTasks",
    FILTER_TASK_TODAY: "FilterTaskByDate",
    FILTER_BY_WEEK: "FilterByWeek",
    FILTER_BY_MONTH: "FilterByMonth"
}

const ViewMediator = PubSub();

export { ViewEvents, ViewMediator }
