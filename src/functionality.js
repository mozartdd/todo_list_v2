export const projectLibrary = [];
export let currentActiveProject = null;

export default class Project {
    static id = 0;
    constructor (name) {
        this.id = `Project-${++Project.id}`;
        this.name = name;
        this.tasks = [];
    }

    createTask(taskName, dueDate, importance, description) {
        if (!taskName || !dueDate || !importance || !description) return null;
        const task = {
            id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            priority: importance,
            name: taskName,
            due: dueDate,
            desc: description,
            isCompleted: false
        }
        this.tasks.push(task);
        return task;
    }

    removeTask(taskId) {
        const idx = this.tasks.findIndex(task => task.id === taskId);
        if (idx !== -1) {
            this.tasks.splice(idx, 1);
        }
    }

    toggleTaskStatus(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        // Toggle completion status of task if found.
        if (task) {
            task.isCompleted = !task.isCompleted;
        }
    }
}

// Creates new Project and adds it to project library.
export function makeNewProject(projectName) {
    if (!projectName) return null;

    const project = new Project(projectName);
    projectLibrary.push(project); 

    if (!currentActiveProject) { 
        currentActiveProject = project.id;
    }
    return project
}

// Removes project from project library array.
export function removeProject(projectId) {
    const idx = projectLibrary.findIndex(p => p.id === projectId);
    if (idx === -1) return;

    // If removing the active project, set new active project or reset to null.
    if (projectLibrary[idx].id === currentActiveProject) {
        projectLibrary.splice(idx, 1);
        if (projectLibrary.length > 0) {
            currentActiveProject = projectLibrary[0].id;
        } else {
            currentActiveProject = null;
        }
    } else {
        projectLibrary.splice(idx, 1);
    }
}

// Update the active project ID to the specified project.
export function setActiveProject(projectId) {
    currentActiveProject = projectId;
}

export function getActiveProjectId() {
    return currentActiveProject;
}

export function getActiveProject() {
    return projectLibrary.find(p => p.id === currentActiveProject);
}
