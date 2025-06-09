import {
    getActiveProject,
    makeNewProject,
    removeProject,
    setActiveProject,
    createTask,
    sortTasks,
} from "./functionality";

import { updateDisplay } from "./ui.js";

import { saveToLocalStorage } from "./storage.js";

// Helper function to get closest element.
function getClosest(element, target) {
    return target.closest(element);
}

// Project dialog event listeners.
const projectDialog = document.querySelector("[data-project-dialog]");
const closeProjectDialogBtn = document.querySelector("[data-close-module]");
const createProjectDialogBtn = document.querySelector("[data-make-project]");
const projectNameInput = document.querySelector("[data-project-name]");

closeProjectDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    projectDialog.close();
});

createProjectDialogBtn.addEventListener("click", (event) => {
    if (!projectNameInput.value.trim()) return;
    makeNewProject(projectNameInput.value);
    saveToLocalStorage();
    event.preventDefault();
    projectDialog.close();
    updateDisplay();
});

// Edit task dialog event listeners.
const submitTaskEdit = document.querySelector("[data-submit-edit]");
const editDialogWindow = document.querySelector("[data-edit-dialog]");
const exitTask = document.querySelector("[data-exit-task]");

const editTaskName = document.querySelector("[data-task-names]");
const editTaskDue = document.querySelector("[data-task-dues]");
const editTaskPriority = document.querySelector("[data-task-prior]");
const editTaskDescription = document.querySelector("[data-task-description]");
let editTaskId;

// Closes task edit dialog window.
exitTask.addEventListener("click", (event) => {
    event.preventDefault();
    editDialogWindow.close();
})

// Submit task edit dialog window.
submitTaskEdit.addEventListener("click", (event) => {
    const currentProject = getActiveProject();

    event.preventDefault();
    event.stopPropagation();
    currentProject.tasks.forEach((task) => {
        task.editTask(editTaskName.value, editTaskDue.value, editTaskPriority.value, editTaskDescription.value, editTaskId);
    })
    saveToLocalStorage();
    editDialogWindow.close();
    updateDisplay();
})

// Create task dialog event listeners
const taskDialog = document.querySelector("[data-task-dialog]");
const closeTaskBtn = document.querySelector("[data-close-task]");
const makeTask = document.querySelector("[data-make-task]");

const taskName = document.querySelector("[data-task-name]");
const taskDue = document.querySelector("[data-task-due]");
const taskPriority = document.querySelector("[data-task-priority]");
const taskDescription = document.querySelector("[data-task-desc]");

// Closes task creation dialog window.
closeTaskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    taskDialog.close();
    editDialogWindow.close();
})

makeTask.addEventListener("click", (event) => {
    if (!taskName.value.trim() || !taskDue.value || taskPriority.value === "") return;
    createTask(taskName.value, taskDue.value, taskPriority.value, taskDescription.value);
    saveToLocalStorage();
    event.preventDefault();
    taskDialog.close();
    updateDisplay();
})

export function eventDelegation() {
    // Project container event delegation.
    const navBar = document.querySelector("nav");
    navBar.addEventListener("click", (event) => {
        const target = event.target;

        // Shows project dialog window.
        if (target.dataset.projectBtn) {
            projectNameInput.value = `New Project`;
            event.stopPropagation();
            projectDialog.showModal();
            updateDisplay();
            return;
        }
        // Event listener to remove project from list.
        if (target.dataset.removeProject) {
            const project = getClosest("li", event.target);

            if (!project) return;
            const id = project.getAttribute("data-id");
            event.stopPropagation();
            removeProject(id);
            saveToLocalStorage();
            updateDisplay();
            return;
        }
        // Event listener to toggle project as active.
        if (target.dataset.projectItem) {
            const project = getClosest("li", event.target);
            const id = project.getAttribute("data-id");

            if (!project) return;
            event.stopPropagation();
            setActiveProject(id);
            updateDisplay();
            return;
        }
    });

    // Task container event delegation.
    const main = document.querySelector("main");
    main.addEventListener("click", (event) => {
        const target = event.target;
        event.stopPropagation();

        // Shows task dialog window
        if (target.dataset.taskBtn) {
            taskName.value = "";
            taskDue.value = "";
            taskPriority.value = "";
            taskDescription.value = "";
            taskDialog.showModal();
            updateDisplay();
            return;
        }
        // Removes task.
        if (target.dataset.rmTask) {
            const tr = getClosest("tr", event.target);
            const currentProject = getActiveProject();

            if (!tr) return;
            const id = tr.getAttribute("data-id");
            event.stopPropagation();
            currentProject.removeTask(id);
            saveToLocalStorage();
            updateDisplay();
            return;
        }
        // Toggles task as completed or not.
        if (target.dataset.completeTask) {
            const tr = getClosest("tr", event.target);
            const currentProject = getActiveProject();
            
            if (!tr) return;
            const id = tr.getAttribute("data-id");
            const currentTask = currentProject.tasks.find(task => task.id === id);
            event.stopPropagation();
            currentTask.toggleTaskStatus();
            saveToLocalStorage();
            updateDisplay();
            return;
        }
        // Task sorting button conditional.
        if (target.dataset.sortBtn) {
            event.stopPropagation();
            sortTasks();
            updateDisplay();
            return;
        }
        // Opens task editor and sets it's value to correct task value.
        if (target.dataset.editTask) {
            const currentProject = getActiveProject();
            const tr = getClosest("tr", event.target);

            if (!tr) return;
            const id = tr.getAttribute("data-id");
            const currentTask = currentProject.tasks.find(task => task.id === id);
            event.stopPropagation();

            // Sets values of edit dialog window to values of task it's being fired on.
            editTaskName.value = currentTask.taskName;
            editTaskPriority.value = currentTask.importance;
            editTaskDescription.value = currentTask.description;
            editTaskDue.value = "";
            editTaskId = currentTask.id;

            editDialogWindow.showModal();
            updateDisplay();
            return;
        }
    });
}
