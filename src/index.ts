require('./styles.scss');
import { todoModule } from "./todo";
import { projectModule, listOfProjects } from "./project";
import { domNavBar } from "./dom/domNavBar";
import { domGrid } from "./dom/domGrid";


let exampleDate = new Date;
let oneMoreWeek = new Date;
let moviesToWatch = 'Movies To Watch';
oneMoreWeek.setDate(oneMoreWeek.getDate() + 6);

let moviesProject = projectModule.newProject('Movies To Watch', );
listOfProjects.push(moviesProject);

let rambo = todoModule.newTodo('Rambo', "low", exampleDate, moviesToWatch, 'Love Stallone. Must watch.');
projectModule.appendTodoToProject(rambo, moviesToWatch);
let terminator = todoModule.newTodo('Terminator', "high", oneMoreWeek, moviesToWatch, "Haven't watched yet");
projectModule.appendTodoToProject(terminator, moviesToWatch);
let theyLive = todoModule.newTodo('They Live', "medium", exampleDate, moviesToWatch, 'I just ran out of bubblegum :)');
projectModule.appendTodoToProject(theyLive, moviesToWatch);
let theThing = todoModule.newTodo('The Thing', 'medium', exampleDate, moviesToWatch, "Love scary movies!" );
projectModule.appendTodoToProject(theThing, moviesToWatch);

domNavBar.generateNavBar();
domGrid.generateGrid();
domGrid.populateLeftGrid();




