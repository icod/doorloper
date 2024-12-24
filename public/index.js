import { registerDiagramComponent } from "./components/diagram/diagram.js";
import { registerDoorloperComponent } from "./components/doorloper/doorloper.js";
import { registerOpgaveComponent } from "./components/opgave/opgave.js";
import { registerOpgavenComponent } from "./components/opgaven/opgaven.js";

const app = () => {
    registerDiagramComponent();
    registerOpgaveComponent();
    registerOpgavenComponent();
    registerDoorloperComponent();
}

document.addEventListener('DOMContentLoaded', app);