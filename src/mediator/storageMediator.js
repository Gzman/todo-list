import { PubSub } from "./pubsub"

const StorageEvents = {
    SAVE_PROJECTS : "SaveProjects",
    UPDATE_PROJECTS : "UpdateProjects",
    GET_STORED_PROJECTS : "GetStoredProjects",
    GET_STORED_PROJECTS_RESP : "GetStoredProjectsResponse"
}

const StorageMediator = PubSub();

export { StorageEvents, StorageMediator }