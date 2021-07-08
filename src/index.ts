require('./styles.scss');
import { restoreLocalCompletedTodosList } from "./todo";
import { restoreLocalListOfProjects } from "./project";
import { storageAvailable } from "./localStorage";
import { domNavBar } from "./dom/domNavBar";
import { domGrid } from "./dom/domGrid";

// If localStorage is supported by current Browser restore listOfProjects and completedTodosList
if (storageAvailable('localStorage')) {
    restoreLocalListOfProjects();
    restoreLocalCompletedTodosList();
  }

domNavBar.generateNavBar();
domGrid.generateGrid();
domGrid.populateLeftGrid();




