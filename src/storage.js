import { projectLibrary, Project, setActiveProject, getActiveProjectId } from "./functionality";

// Initial project and task declaration.
export function setInitialProjects() {
    const restored = JSON.parse(localStorage.getItem("projectLibrary")) || [];
    const currentActiveProject = JSON.parse(localStorage.getItem("currentActiveProject"));

    restored.forEach(obj => projectLibrary.push(Project.from(obj)));

    if (projectLibrary.some(p => p.id === currentActiveProject)) {
        setActiveProject(currentActiveProject);
    } else if (projectLibrary.length > 0) {
        setActiveProject(projectLibrary[0].id);
    }
}

export function saveToLocalStorage() {
    const serializedProjects = JSON.stringify(projectLibrary);
    localStorage.setItem("projectLibrary", serializedProjects);

    const serializedActive = JSON.stringify(getActiveProjectId());
    localStorage.setItem("currentActiveProject", serializedActive);
}