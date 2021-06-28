const KEY = "Projects";

const serializeProjects = (projects) => JSON.stringify(projects);
const deserializeProjects = (serializedProjects) => JSON.parse(serializedProjects);

const saveProjects = (serializedProjects) => localStorage.setItem(KEY, serializedProjects);
const loadProjects = () => localStorage.getItem(KEY);

const load = () => {
    const serialized = loadProjects();
    const projects = deserializeProjects(serialized);
    return projects;
}

const save = (projects) => {
    Promise.resolve(projects)
        .then(result => serializeProjects(result))
        .then(result => saveProjects(result))
        .then(console.log("Projects saved", Date.now()));
}

const update = (projects) => save(projects);

export { load, save, update }