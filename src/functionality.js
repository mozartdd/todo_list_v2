const generateUniqueId = require('generate-unique-id');
export const projectLibrary = [];
let currentActiveProject = null;
let lowToHigh = true; // Boolean which tells in what order should tasks be sorted.

export class Project {
    constructor (name) {
        this.id = `Project-${generateUniqueId()}`;
        this.name = name;
        this.tasks = [];
    }

    static from(obj) {
        const project = new Project(obj.name);
        project.id = obj.id;
        project.tasks = obj.tasks.map(t => Object.assign(new Task(), t));
        return project;
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
        this.id = `Task-${generateUniqueId()}`;
        this.taskName = taskName;
        this.dueDate = computeTimeLeft(dueDate); 
        this.importance = importance;
        this.description = description;
    }

    // Toggles task's complete status.
    toggleTaskStatus() {
        this.isCompleted = !this.isCompleted;
    }
    // Edit task after it is created.
    editTask(taskName, dueDate, importance, description, taskId) {
        if (this.id === taskId) {
            this.taskName = taskName;
            this.dueDate = computeTimeLeft(dueDate); 
            this.importance = importance;
            this.description = description;  
        }
        return;
    }
}

// Calculates how far is task's due date in days.
function computeTimeLeft(dueDate) {
    const currentDate = new Date();
    const userDate = new Date(dueDate);
    const timeDifference = userDate - currentDate;
    let result =  Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return result = result >= 1 ? result : 0;
}

// Sorts tasks by time left to complete it.
export function sortTasks() {
    const currentProject = getActiveProject();

    currentProject.tasks.sort((firstTask, secondTask) => {
        return lowToHigh // If true,
        ? firstTask.dueDate - secondTask.dueDate // firstTask goes before second task,
        : secondTask.dueDate - firstTask.dueDate;// else secondTask goes before first.
    })
    lowToHigh = !lowToHigh;
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
    if (!projectId) {
        currentActiveProject = null;
    } else {
        currentActiveProject = projectId;
    }
}

export function getActiveProjectId() {
    return currentActiveProject;
}

export function getActiveProject() {
    return currentActiveProject
        ? projectLibrary.find(p => p.id === currentActiveProject) 
        : null;
}
