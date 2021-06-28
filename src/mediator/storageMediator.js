import { PubSub } from "./pubsub"

const StorageEvents = {
    SAVE_PROJECTS : "SaveProjects",
    UPDATE_PROJECTS : "UpdateProjects",
    LOAD_PROJECTS : "LoadProjects",
    GET_PROJECTS : "GetProjects"
}

const StorageMediator = PubSub();

export { StorageEvents, StorageMediator }