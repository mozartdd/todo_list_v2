import { projectLibrary, getActiveProject } from "./functionality";

const projectContainer = document.querySelector("ul");
const taskContainer = document.querySelector("tbody");
const taskFooter = document.querySelector("tfoot");
const currentProjectContainer = document.querySelector("[data-current-project]");

export function updateDisplay() {
    renderProjects();
    renderCurrentProject();
    renderTasks();
}

function renderProjects() {
    projectContainer.innerHTML = ``;

    // Iterates over all projects and displays it's current state.
    projectLibrary.forEach((project) => {
        const projectItem = document.createElement("li");
        projectItem.dataset.projectItem = "true";
        projectItem.dataset.id = project.id;
        projectItem.textContent = project.name;

        // Button to remove/delete project from screen & project library.
        const closeButton = document.createElement("button");
        closeButton.dataset.removeProject = "true";
        closeButton.classList.add("delete-project-btn")
        closeButton.textContent = "x"; 

        projectContainer.appendChild(projectItem);
        projectItem.appendChild(closeButton);
    })
}

// Displays current active project on screen.
function renderCurrentProject() {
    const activeProject = getActiveProject();
    if (activeProject) {
        currentProjectContainer.textContent = activeProject.name;
    } else {
        currentProjectContainer.textContent = "No active project";
    }
}

// Iterates over all tasks and displays it's current state.
function renderTasks() {
    taskFooter.innerHTML = ``;
    taskContainer.innerHTML = ``;
    const activeProject = getActiveProject();

    if (activeProject === null) return;
    else {
        activeProject.tasks.forEach((task) => {
            if (task.isCompleted === false) {
                const tr = document.createElement("tr");
                tr.dataset.id = task.id;
                tr.innerHTML = `
                    <td>${task.importance}</td>
                    <td>${task.taskName}</td>
                    <td>${task.dueDate}</td>
                    <td>${task.description}</td>
                    <td>
                        <input data-complete-task="true" type="checkbox">
                        <button data-rm-task="true">x</button>
                    </td>
                    `
                taskContainer.appendChild(tr);
            } else {
                const tr = document.createElement("tr");
                tr.classList.add("completed")
                tr.dataset.id = task.id;
                tr.innerHTML = `
                    <td>${task.importance}</td>
                    <td>${task.taskName}</td>
                    <td>${task.dueDate}</td>
                    <td>${task.description}</td>
                    <td>
                        <input data-complete-task="true" type="checkbox">
                        <button data-rm-task="true">x</button>
                    </td>
                    `
                taskFooter.appendChild(tr);
            }
        })
    }
}

