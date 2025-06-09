import "./styles.css";

import { setInitialProjects } from "./storage.js";
import { updateDisplay } from "./ui.js";
import { eventDelegation } from "./controls.js";

setInitialProjects();
updateDisplay();
eventDelegation();
