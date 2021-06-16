import {PubSub} from "./pubsub.js"

const ViewEvents = {
    SELECT_PROJECT : "SelectProject",
    CREATE_PROJECT : "CreateProject",
    REMOVE_PROJECT : "RemoveProject",
    FILTER_TASKS : "FilterTasks",
    CREATE_TASK : "CreateTask",
    REMOVE_TASK : "RemoveTask",
    EDIT_TASK : "EditTask",
    ADD_TAGS_TASK : "AddTagsToTask"
}

const ViewMediator = PubSub();

export {ViewEvents, ViewMediator}
