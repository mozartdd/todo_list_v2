import "./styles.css";
import { makeNewProject, createTask } from "./functionality.js";
import { setInitialProjects } from "./storage.js";
import { updateDisplay } from "./ui.js";
import { eventDelegation } from "./controls.js";

renderInitialTask()
setInitialProjects();
updateDisplay();
eventDelegation();

function renderInitialTask() {
    const project1 = makeNewProject("Personal");
    createTask("Buy groceries", "2025-06-10", "high", "Milk, eggs, bread");
    createTask("Call plumber", "2025-06-11", "medium", "Fix kitchen leak");
    createTask("Finish report", "2025-06-12", "high", "Monthly sales analysis");
    createTask("Team meeting", "2025-06-13", "low", "Weekly sync-up");
    createTask("Morning run", "2025-06-09", "medium", "5km jog around park");
    createTask("Yoga session", "2025-06-10", "low", "30 minutes stretching");
}
