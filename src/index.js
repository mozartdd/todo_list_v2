import "./styles.css";
import { createTask, makeNewProject } from "./functionality.js";
import { updateDisplay } from "./ui.js";
import { eventDelegation } from "./controls.js";

    makeNewProject("Study web development");
    makeNewProject("Clean house");
        createTask("Learn destructuring", "2025-06-8", "low", "Focus on array destructuring");
        createTask("Practice async/await", "2025-07-01", "medium", "Understand async flow");
        createTask("Master closures", "2025-06-30", "high", "Deep dive into closures");
        createTask("Review ES6 features", "2025-07-15", "medium", "Go through new syntax");
        createTask("Build small project", "2025-08-01", "high", "Apply destructuring and async");
    updateDisplay();
    eventDelegation();