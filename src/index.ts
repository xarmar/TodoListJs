require ('./style.scss');
import { todoModule } from "./todo";
import { projectModule } from "./project";
import { domNavBar } from "./dom/domNavBar";
import { domGrid } from "./dom/domGrid";

let shopppingProject = projectModule.newProject('Shopping');
projectModule.listOfProjects.push(shopppingProject);

let exampleDate = new Date;
let oneMoreWeek = new Date;
oneMoreWeek.setDate(oneMoreWeek.getDate() + 6);

let bananas = todoModule.newTodo('Bananas', "low", exampleDate, 'Shopping', 'Must be ripe and ready to eat.');
projectModule.appendTodoToProject(bananas, 'Shopping');
let strawberries = todoModule.newTodo('Strawberries', "medium", oneMoreWeek, 'Shopping', 'Needs to be biological.');
projectModule.appendTodoToProject(strawberries, 'Shopping');
let icreCream = todoModule.newTodo('Ice cream', "high", exampleDate, 'Shopping', 'Vanilla or Chocolate');
projectModule.appendTodoToProject(icreCream, 'Shopping');
'Movies I want to watch'
let moviesProject = projectModule.newProject('Movies To Watch', );
projectModule.listOfProjects.push(moviesProject);


let rambo = todoModule.newTodo('Rambo', "low", exampleDate, 'Movies To Watch', 'Love Stallonne. Must watch.');
projectModule.appendTodoToProject(rambo, 'Movies To Watch');
let terminator = todoModule.newTodo('Terminator', "high", oneMoreWeek, 'Movies To Watch', "Haven't watched yet");
projectModule.appendTodoToProject(terminator, 'Movies To Watch');
let theyLive = todoModule.newTodo('They Live', "medium", exampleDate, 'Movies To Watch', 'I just ran out of bubblegum :)');
projectModule.appendTodoToProject(theyLive, 'Movies To Watch');

domNavBar.generateNavBar();
domGrid.generateGrid();
domGrid.populateLeftGrid();




