import {
    getActiveProject,
    makeNewProject,
    removeProject,
    setActiveProject,
    projectLibrary
} from "./functionality";

import { updateDisplay } from "./ui.js";

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
    makeNewProject(projectNameInput.value)
    event.preventDefault();
    projectDialog.close();
    updateDisplay();
});

// Task dialog event listeners.
const taskDialog = document.querySelector("[data-task-dialog]");
const addTaskBtn = document.querySelector("[data-task-btn]");
const closeTaskBtn = document.querySelector("[data-close-task]");
const makeTask = document.querySelector("[data-make-task]");
const taskName = document.querySelector("[data-task-name]");
const taskDue = document.querySelector("[data-task-due]");
const taskPriority = document.querySelector("[data-task-priority]");
const taskDescription = document.querySelector("[data-task-desc]")

addTaskBtn.addEventListener("click", () => {
    taskName.value = "";
    taskDue.value = "";
    taskPriority.value = "";
    taskDescription.value = "";
    taskDialog.showModal();
})
closeTaskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    taskDialog.close();
})
//createTask(taskName, dueDate, importance, description)
makeTask.addEventListener("click", (event) => {
    const currentProject = getActiveProject();
    currentProject.createTask(taskName.value, taskDue.value, taskPriority.value, taskDescription.value);
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
            const project = target.closest("li");
            if (!project) return;
            const id = project.getAttribute("data-id");
            event.stopPropagation();
            removeProject(id);
            updateDisplay();
            return;
        }
        // Event listener to toggle project as active.
        if (target.dataset.projectItem) {
            const project = target.closest("li");
            if (!project) return;
            const id = project.getAttribute("data-id");
            event.stopPropagation();
            setActiveProject(id);
            updateDisplay();
            return;
        }
    });

    // TODO: Add event listeners to task buttons & task dialog window.
}
