import { StorageEvents, StorageMediator } from "../mediator/storageMediator"
import { load, save, update } from "./localStorage";

const Storage = (() => {
    StorageMediator.subscribe(StorageEvents.SAVE_PROJECTS, (projects) => save(projects));

    StorageMediator.subscribe(StorageEvents.UPDATE_PROJECTS, (projects) => update(projects));

    StorageMediator.subscribe(StorageEvents.LOAD_PROJECTS, () => {
        const projects = load();
        StorageMediator.publish(StorageEvents.GET_PROJECTS, { savedProjects: projects });
    });

})();



