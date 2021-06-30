require ('./style.scss');

import { todoModule } from "./todo";
import { projectModule } from "./project";
import { dom } from "./domGenerator";
import { helperfunction } from "./helperFunctions";

let shopppingProject = projectModule.newProject('Shopping', 'My shopping list');
projectModule.listofProjects.push(shopppingProject);

let exampleDate = new Date;


let todo = todoModule.newTodo('buy bananas', "low", exampleDate);
projectModule.appendTodoToProject(todo, 'Shopping');
let todo2 = todoModule.newTodo('buy strawberries', "medium", exampleDate);
projectModule.appendTodoToProject(todo2, 'Shopping');
let todo3 = todoModule.newTodo('buy tomatoes', "high", exampleDate);
projectModule.appendTodoToProject(todo3, 'Shopping');


let studyProject = projectModule.newProject('To Study', 'My topics to study later');
projectModule.listofProjects.push(studyProject);


dom.generateNavBar();
dom.generateGrid();
dom.populateLeftGrid();




