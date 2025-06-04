import { projectLibrary, getActiveProject} from "./functionality";
import { eventDelegation } from "./controls";

const projectContainer = document.querySelector("ul");
const currentProjectContainer = document.querySelector("[data-current-project]");

export function updateDisplay() {
    eventDelegation();
    renderProjects();
}

function renderProjects() {
    projectContainer.innerHTML = ``;
    projectLibrary.forEach((project) => {
        const projectItem = document.createElement("li");
        projectItem.dataset.projectItem = "true";
        projectItem.dataset.id = project.id;
        projectItem.textContent = project.name;
        projectContainer.appendChild(projectItem);

        const closeButton = document.createElement("button");
        closeButton.dataset.removeProject = "true";
        closeButton.classList.add("delete-project-btn")
        closeButton.textContent = "x"; 
        projectItem.appendChild(closeButton);
    })
    console.log(currentProjectContainer.innerHTML);
}