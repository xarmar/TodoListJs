require ('./style.scss');

import { todoModule } from "./todo";
import { projectModule } from "./project";
import { dom } from "./domGenerator";

dom.generateNavBar();
dom.generateGrid();
dom.populateLeftGrid();




