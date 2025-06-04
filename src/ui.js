import { projectLibrary, getActiveProject, makeNewProject} from "./functionality";
import { eventDelegation } from "./controls";

const projectContainer = document.querySelector("ul");
const taskContainer = document.querySelector("tbody");
const currentProjectContainer = document.querySelector("[data-current-project]");

export function updateDisplay() {
    renderProjects();
    renderCurrentProject();
}

function renderProjects() {
    projectContainer.innerHTML = ``;

    projectLibrary.forEach((project) => {
        const projectItem = document.createElement("li");
        projectItem.dataset.projectItem = "true";
        projectItem.dataset.id = project.id;
        projectItem.textContent = project.name;

        const closeButton = document.createElement("button");
        closeButton.dataset.removeProject = "true";
        closeButton.classList.add("delete-project-btn")
        closeButton.textContent = "x"; 

        projectContainer.appendChild(projectItem);
        projectItem.appendChild(closeButton);
    })
}

function renderCurrentProject() {
    const activeProject = getActiveProject();
    currentProjectContainer.textContent = activeProject.name;
}

