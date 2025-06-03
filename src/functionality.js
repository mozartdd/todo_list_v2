// Array to store all projects.
const projectLibrary = [];
const currentActiveProject = null; // Variable which will hold current active project if none it is set to null.

// Project creating class.
export default class Project {
    static id = 0;
    constructor (name) {
        this.id = `Project-${++Project.id}`;
        this.name = name;
        this.tasks = [];
    }

    createTask(taskName, dueDate, importance, description) {
        const task = {
            id: `task-${Math.floor(Math.random() * Date.now()).toString(36)}`,
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
        if (task) {
            task.isCompleted = !task.isCompleted;
        }
    }
}

// Creates new Project and adds it to project library.
function makeNewProject(projectName) {
    if (projectName === "") return null;

    const project = new Project(projectName);
    project.push(projectLibrary); 

    if (!currentActiveProject) { // If no active project make new project active.
        currentActiveProject = project.id;
        project.push(projectLibrary);
    }
    return project
}

