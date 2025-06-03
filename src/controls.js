import {
    removeProject,
    setActiveProject
} from "./functionality";

import { updateDisplay } from "./ui.js";

const projectDialog = document.querySelector("[data-project-dialog]");
const closeProjectDialogBtn = document.querySelector("[data-close-module]");
const createProjectDialogBtn = document.querySelector("[data-make-project]");

closeProjectDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    projectDialog.close();
});

createProjectDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    projectDialog.close();
});

export function eventDelegation() {
    // Project container delegation
    const navBar = document.querySelector("nav");
    navBar.addEventListener("click", (event) => {
        const target = event.target;

        // Shows project dialog window.
        if (target.dataset.projectBtn) {
            projectDialog.showModal();
            return;
        }
        // Event listener to remove project from list.
        if (target.dataset.removeProject) {
            const project = target.closest("li");
            if (!project) return;
            const id = project.getAttribute("data-id");
            if (confirm("Do you want to delete project?")) {
                removeProject(id);
                updateDisplay();
            }
            return;
        }
        // Event listener to toggle project as active.
        if (target.dataset.projectItem) {
            const project = target.closest("li");
            if (!project) return;
            const id = project.getAttribute("data-id")
            toggleActiveProject(id);
            updateDisplay();
            return;
        }
    });

    // TODO: Add event listeners to task buttons & task dialog window.
}
