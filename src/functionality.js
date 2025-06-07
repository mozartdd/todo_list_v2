export const projectLibrary = [];
export let currentActiveProject = null;

export default class Project {
    static id = 0;
    constructor (name) {
        this.id = `Project-${++Project.id}`;
        this.name = name;
        this.tasks = [];
    }

    removeTask(taskId) {
        const idx = this.tasks.findIndex(task => task.id === taskId);
        if (idx !== -1) {
            this.tasks.splice(idx, 1);
        }
    }
}

export class Task {
    constructor(taskName, dueDate, importance, description) {
        this.isCompleted = false;
        this.id = `Task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        this.taskName = taskName;
        this.dueDate = computeTimeLeft(dueDate); 
        this.importance = importance;
        this.description = description;
    }

    // Toggles task's complete status.
    toggleTaskStatus() {
        this.isCompleted = !this.isCompleted;
    }
    }

// Calculates how far is task's due date in days.
function computeTimeLeft(dueDate) {
        const currentDate = new Date();
        const userDate = new Date(dueDate);
        const timeDifference = userDate - currentDate;
        let result =  Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        if (result > 1) {
            return result + " days";
        } else if (result === 1) {
            return result + " day"
        } else if (timeDifference < 0) {
            return "0 days";
        }
    }

// Sorts tasks by time left to complete it.
export function sortTasks() {
    const currentProject = getActiveProject()

    currentProject.tasks.sort((firstDate, secondDate) => {
        return firstDate.dueDate.split(" ")[0] - secondDate.dueDate.split(" ")[0];
    })
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

// Makes new Task and adds it to the project tasks array.
export function createTask(taskName, dueDate, importance, description) {
    if (!taskName || !dueDate || !importance) return null;

    const currentProject = getActiveProject();
    const task = new Task(taskName, dueDate, importance, description);

    if (currentProject) {
        currentProject.tasks.push(task);
        return task;
    }
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
    return currentActiveProject !== null 
        ? projectLibrary.find(p => p.id === currentActiveProject) 
        : null;
}
