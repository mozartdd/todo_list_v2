import { projectLibrary, getActiveProject } from "./functionality";
import editImg from "./assets/edit.svg";
import rmImg from "./assets/rm.svg";
import unchecked from "./assets/unchecked.svg";
import checked from "./assets/checked.svg";

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
        const closeButton = document.createElement("img");
        closeButton.dataset.removeProject = "true";
        closeButton.classList.add("delete-project-btn")
        closeButton.setAttribute("src", rmImg); 

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
                taskContentHtml(taskContainer, "not-completed", task, true);
            } else {
                taskContentHtml(taskFooter, "completed", task, false);
            }
        })
    }
}

// Function which render content of task section of display. 
function taskContentHtml(parentElement, classList, task, isChecked) {
    const tr = document.createElement("tr");
    tr.id = classList;
    tr.dataset.id = task.id;
    tr.innerHTML = `
        <td><div>${checkForCondition(tr, task.importance)}</div></td>
        <td>${task.taskName}</td>
        <td>${isChecked ? task.dueDate + " days" : "Completed"}</td>
        <td>${task.description}</td>
        <td>
            <img id="edit-task-btn" data-complete-task="true" src="${isChecked ? unchecked : checked}">
            <img id="edit-task-btn" data-edit-task="true" src="${editImg}">
            <img id="edit-task-btn" data-rm-task="true" src="${rmImg}">
        </td>
    `
    parentElement.appendChild(tr);
}

// Helper function to add class to priority td.
function checkForCondition(element, condition) {
    if (condition === "low") {
        element.classList = "green";
    } else if (condition === "medium") {
        element.classList = "orange";
    } else if (condition === "high") {
        element.classList = "red";
    }
    return "";
}

