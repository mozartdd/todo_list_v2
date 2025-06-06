import {
    getActiveProject,
    makeNewProject,
    removeProject,
    setActiveProject,
    createTask
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
    if (!projectNameInput.value.trim()) return;
    makeNewProject(projectNameInput.value)
    event.preventDefault();
    projectDialog.close();
    updateDisplay();
});

// Task dialog event listeners.
const taskDialog = document.querySelector("[data-task-dialog]");
const closeTaskBtn = document.querySelector("[data-close-task]");
const makeTask = document.querySelector("[data-make-task]");
const taskName = document.querySelector("[data-task-name]");
const taskDue = document.querySelector("[data-task-due]");
const taskPriority = document.querySelector("[data-task-priority]");
const taskDescription = document.querySelector("[data-task-desc]");


closeTaskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    taskDialog.close();
})

makeTask.addEventListener("click", (event) => {
    if (!taskName.value.trim() || !taskDue.value || taskPriority.value === "") return;
    createTask(taskName.value, taskDue.value, taskPriority.value, taskDescription.value);
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
            const tr = target.closest("tr");
            const currentProject = getActiveProject();

            if (!tr) return;
            const id = tr.getAttribute("data-id");
            event.stopPropagation();
            currentProject.removeTask(id);
            updateDisplay();
            return;
        }
        // Toggles task as completed or not.
        if (target.dataset.completeTask) {
            const tr = target.closest("tr");
            const currentProject = getActiveProject();
            
            if (!tr) return;
            const id = tr.getAttribute("data-id");
            event.stopPropagation();
            const currentTask = currentProject.tasks.find(task => task.id === id);
            currentTask.toggleTaskStatus(id);
            updateDisplay();
            return;
        }
    });
}
