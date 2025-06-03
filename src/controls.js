import {
    removeProject,
    toggleActiveProject
} from "./functionality";

const projectDialog = document.querySelector("[data-project-dialog]");
const closeProjectDialogBtn = document.querySelector("[data-close-module]");
const createProjectDialogBtn = document.querySelector("[data-make-project]");

closeProjectDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    projectDialog.close();
})

createProjectDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    projectDialog.close();
})

export function eventDelegation() {
    // Project container delegation
    const navBar = document.querySelector("nav");
    navBar.addEventListener("click", (event) => {
        const target = event.target;

        if (target.dataset.projectBtn) {
            projectDialog.showModal();
        }
        else if (target.dataset.removeProject) {
            const project = target.closest("li");
            const id = project.getAttribute("data-id");
            if (confirm("Do you want to delete project?")) {
                removeProject();
                updateDisplay();
            }
        }
        else if (target.dataset.projectItem) {
            const project = target.closest("li");
            const id = project.getAttribute("data-id")
            toggleActiveProject(id);
            updateDisplay();
        }
    })
}
