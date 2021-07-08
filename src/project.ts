import { domGrid } from "./dom/domGrid";
import { helperfunction } from "./helperFunctions";
import { Todo, todoModule } from "./todo";
import { saveLocalStorage } from "./localStorage";

export class Project {
    title: string;
    children: Todo[];
    
    constructor(title: string) {
        this.title = title;
        this.children = [];
    }

    changeTitle (newTitle: string) {
        this.title = newTitle;
    }
}
var localStorageListOfProjects: Project[];
export var listOfProjects: Project[] = [];


// Populate listOfProjects with localStorage. If localListofProjects is null, create default Projects with Todos
export const restoreLocalListOfProjects = () => {
    // get local storage of listOfProjects
    localStorageListOfProjects = JSON.parse(localStorage.getItem("listOfProjects"));

    // if it's not empty, restore localStorage
    if (localStorageListOfProjects !== null) {
        // Loop through local storage of listOfProjects. For each project: create a new Project + append respective Todos.
        localStorageListOfProjects.forEach(localStorageProject => {
            let newProject = projectModule.newProject(localStorageProject.title);
            localStorageProject.children.forEach(todo => {
                let newTodo = todoModule.newTodo(todo.title, todo.priority, todo.dueDate, todo.parentProject, todo.completed, todo.description);
                newProject.children.push(newTodo);
            });
            listOfProjects.push(newProject);
        });
    }
    // if localStorage is Null
    else {
        listOfProjects = [];

        // Create example dates
        let exampleDate = new Date;
        let oneMoreWeek = new Date;
        oneMoreWeek.setDate(oneMoreWeek.getDate() + 6);

        // Create Default Project
        let moviesToWatch = 'Movies To Watch';
        let moviesProject = projectModule.newProject('Movies To Watch', );
        listOfProjects.push(moviesProject);

        // Create Defaults Todos
        let rambo: Todo = todoModule.newTodo('Rambo', "low", exampleDate, moviesToWatch, false, 'Love Stallone. Must watch.');
        projectModule.appendTodoToProject(rambo, moviesToWatch);
        let terminator: Todo = todoModule.newTodo('Terminator', "high", oneMoreWeek, moviesToWatch, false, "Haven't watched yet");
        projectModule.appendTodoToProject(terminator, moviesToWatch);
        let theyLive: Todo = todoModule.newTodo('They Live', "medium", exampleDate, moviesToWatch, false, 'I just ran out of bubblegum :)');
        projectModule.appendTodoToProject(theyLive, moviesToWatch);
        let theThing: Todo = todoModule.newTodo('The Thing', 'medium', exampleDate, moviesToWatch, false, "Love scary movies!" );
        projectModule.appendTodoToProject(theThing, moviesToWatch);
    }
  }

export const projectModule = (() => {


    const newProject = (title: string) => {
        let newProj = new Project(title);
        return newProj;
    }

    const deleteProject = (titleofProject: string) => {

        // Identify project
        let projectToDelete: Project = getProjectByTitle(titleofProject);

        // Delete children Todo's
        let arrayOfTodosToDelete = projectToDelete.children;
        arrayOfTodosToDelete.splice(0, arrayOfTodosToDelete.length);

        // Delete Project
        let indexOfProjectToDelete = listOfProjects.indexOf(projectToDelete);
        listOfProjects.splice(indexOfProjectToDelete, 1);

        // Update Left-Grid (remove deleted project)
        domGrid.updateSideBarProjects();

        // Remove Table and Project From Screen (display Blank);
        let stickyRightDiv = document.querySelector('#stickyRightDiv');
        helperfunction.removeChildNodes(stickyRightDiv);

        saveLocalStorage();
    }

    const appendTodoToProject = (todo: Todo, projectTitle: string) => {
        listOfProjects.forEach(project => {
            if(project.title === projectTitle) {
                project.children.push(todo);
            }
        });
        saveLocalStorage();
    }

    const removeTodoFromProject = (todo: Todo, parentProjectTitle: string) => {
        
        let targetProject: Project = getProjectByTitle(parentProjectTitle);
        let allTodosInTargetProject: Todo[] = targetProject.children;

        let indexOfTodoToRemove = allTodosInTargetProject.indexOf(todo);

        allTodosInTargetProject.splice(indexOfTodoToRemove, 1);

        saveLocalStorage();
        
    }

    const getProjectByTitle = (projectTitle: string) => {
        let projectToReturn;
        listOfProjects.forEach(project => {
            if(projectTitle === project.title) {
                projectToReturn = project
            }
        });
        return projectToReturn
    }


    return {
        newProject: newProject,
        deleteProject: deleteProject,
        removeTodoFromProject : removeTodoFromProject,
        appendTodoToProject: appendTodoToProject,
        getProjectByTitle: getProjectByTitle
    }
    
    })();