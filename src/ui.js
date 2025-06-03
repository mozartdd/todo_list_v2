import { projectLibrary} from "./functionality";
import { eventDelegation } from "./controls";

const projectContainer = document.querySelector("ul")

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
        closeButton.textContent = "x"; 
        projectItem.appendChild(closeButton);
    })
}
