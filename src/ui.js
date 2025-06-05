import { projectLibrary, getActiveProject } from "./functionality";

const projectContainer = document.querySelector("ul");
const taskContainer = document.querySelector("tbody");
const currentProjectContainer = document.querySelector("[data-current-project]");

export function updateDisplay() {
    renderProjects();
    renderCurrentProject();
    renderTasks();
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
    if (activeProject) {
        currentProjectContainer.textContent = activeProject.name;
    } else {
        currentProjectContainer.textContent = "No active project";
    }
}

function renderTasks() {
    taskContainer.innerHTML = ``;
    const activeProject = getActiveProject();

    activeProject.tasks.forEach((task) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${task.priority}</td>
            <td>${task.name}</td>
            <td>${task.due}</td>
            <td>${task.desc}</td>
            `
        taskContainer.appendChild(tr);
    })

}

