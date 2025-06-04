import "./styles.css";
import { makeNewProject } from "./functionality.js";
import {updateDisplay} from "./ui.js";
import {eventDelegation} from "./controls.js";

    makeNewProject("Clean house");
    makeNewProject("Study web development");
    updateDisplay();
    eventDelegation();
