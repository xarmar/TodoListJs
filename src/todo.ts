import { Priority } from "./types";
import { projectModule, listOfProjects, Project } from "./project";
import { domForm } from "./dom/domForm";
import { saveLocalStorage } from "./localStorage";
import * as moment from "moment";

export class Todo {
    parentProject: string;
    priority: Priority;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    
    constructor(title: string, priority: Priority, dueDate: Date, parentProject: string, completed:boolean, description?: string) {
        this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.parentProject = parentProject
        this.completed = completed;
        this.description = description;
    }

    changeTitle (newTitle: string) {
        this.title = newTitle;
    }

    changePriority (newPriority: Priority) {
        this.priority = newPriority;
    }

    changeDescription (newDescription: string) {
        this.description = newDescription;
    }
    
    changeDueDate (newDueDate: Date) {
        this.dueDate = newDueDate;
    }

    changeParentProject (newParentProject: string) {
        this.parentProject = newParentProject;
    }

    toggleCompleteStatus() {
        this.completed = !this.completed;
    }
}

var localCompletedTodosList: Todo[];
export var completedTodosList: Todo[] = [];

// Populate completedTodosList with localStorage
export const restoreLocalCompletedTodosList = () => {

    // get local storage of completedTodosList
    localCompletedTodosList = JSON.parse(localStorage.getItem("completedTodosList"));

    // if it's not empty, restore localStorage
    if (localCompletedTodosList !== null) {
        // Loop through local storage of completedTodosList. For each todo, create a new Todo and append to completedTodosList.
        localCompletedTodosList.forEach(todo => {
            let newTodo = todoModule.newTodo(todo.title, todo.priority, todo.dueDate, todo.parentProject, todo.completed, todo.description);
            completedTodosList.push(newTodo);
        });
    }
    else {
        completedTodosList = [];
    }
  }

export var todosThatWillPopulateTableArray: Todo[] = [];

// todoModule
export const todoModule = (() => {
   
    const newTodo = (title: string, priority: Priority, dueDate: Date, parentProject: string, completed:boolean, description?: string) => {
        let newTodoObject = new Todo(title, priority, dueDate, parentProject, completed, description);
        return newTodoObject;
    }

    const editTodo = (projectTitle: string, todoTitle: string) => {
       
        // Identify Project
        let targetProject: Project;
        let projectsList = listOfProjects;

        projectsList.forEach(project => {
            if(project.title === projectTitle) {
                targetProject = project
            }
        });

        // Identify Todo
        let targetTodo: Todo;
        let todosList = targetProject.children;

        todosList.forEach(todo => {
            if(todo.title === todoTitle) {
                targetTodo = todo;
            }
        });

        domForm.todoPopUp(targetProject, targetTodo);

    }

    const deleteTodo = (todoTitle, parentProjectTitle, event, isCompleted) => {

        // if Todo has been completed, remove from completedTodosList
        if (isCompleted) {
            completedTodosList.forEach(todo => {
                if(todo.title === todoTitle && todo.parentProject === parentProjectTitle) {
                    let index = completedTodosList.indexOf(todo);
                    completedTodosList.splice(index, 1);
                }
             });
        }
        else {
            // Remove Todo from the Project
            let targetTodo = todoModule.getTodoByTitle(todoTitle, parentProjectTitle);
            projectModule.removeTodoFromProject(targetTodo, parentProjectTitle);
        }        

        // Remove Todo from table
        let targetRow = event.target.dataset.targetrow;
        let tableRowToRemove = document.querySelector(`#data-row${targetRow}`);
        tableRowToRemove.remove();
        let expandedTodoToRemove = document.querySelector(`#expanded${targetRow}`);
        expandedTodoToRemove.remove();

        saveLocalStorage();

    }

    const generateArrayOfTodosBasedOnDate = (date: Date, weekDate?: Date) => {

        // Reset
        todosThatWillPopulateTableArray = [];

        if (!weekDate) {
            listOfProjects.forEach(project => {
                project.children.forEach(todo => {
                    if(moment(todo.dueDate).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD')) {
                        todosThatWillPopulateTableArray.push(todo);
                    }
                });
            });
        }
        else {
            listOfProjects.forEach(project => {
                project.children.forEach(todo => {
                    let formattedTodoDate = moment(todo.dueDate).format('YYYY-MM-DD');
                    let formattedDate = moment(date).format('YYYY-MM-DD');
                    let formattedWeekDate = moment(weekDate).format('YYYY-MM-DD');
                    if(moment(formattedTodoDate).isBetween(formattedDate, formattedWeekDate, undefined, '[]')) {
                        todosThatWillPopulateTableArray.push(todo);
                    }
                }); 
            });
        }
        return todosThatWillPopulateTableArray
    }

    const getTodoByTitle = (todoTitle: string, parentProjectTitle: string) => {

        // init todo that will be returned
        let returnedTodo: Todo;

        let parentProject: Project = projectModule.getProjectByTitle(parentProjectTitle);
        let parentProjectChildren: Todo[] = parentProject.children;
        // find todo that will be edited
        parentProjectChildren.forEach(todo => {
            if(todo.title === todoTitle) {
                returnedTodo = todo;
            }
        });
        return returnedTodo
    }

    const markTodoAsCompleted = (todo: Todo, event) => {  

        // Make todo status as completed
        todo.toggleCompleteStatus();
        
        // Add Todo to a list of completed Todos
        completedTodosList.push(todo);

        // Remove Todo from table
        let targetRow = event.target.dataset.targetrow;
        let tableRowToRemove = document.querySelector(`#data-row${targetRow}`);
        tableRowToRemove.remove();
        let expandedTodoToRemove = document.querySelector(`#expanded${targetRow}`);
        expandedTodoToRemove.remove();
        
        projectModule.removeTodoFromProject(todo, todo.parentProject);

        saveLocalStorage();
    }

    const clearCompletedTodosList = () => {
        completedTodosList.splice(0, completedTodosList.length);
        saveLocalStorage();
    }

    const convertTodoStringDatesIntoDates = (arrayOfTodos: Todo[]) => {
        // check if todo.dueDate is of type 'string', if so, convert it to Date type (localStorage saves Date as strings)
        arrayOfTodos.forEach(todo => {
            if(typeof(todo.dueDate) === 'string') {
                let correctDateFormat = new Date(todo.dueDate);
                todo.changeDueDate(correctDateFormat);
            }
         });
         return arrayOfTodos
    }
    
    return {
        newTodo: newTodo,
        generateArrayOfTodosBasedOnDate: generateArrayOfTodosBasedOnDate,
        editTodo: editTodo,
        deleteTodo: deleteTodo,
        getTodoByTitle: getTodoByTitle,
        markTodoAsCompleted: markTodoAsCompleted,
        clearCompletedTodosList: clearCompletedTodosList,
        convertTodoStringDatesIntoDates: convertTodoStringDatesIntoDates
    }
    
    })();
    