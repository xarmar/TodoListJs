import { Priority, ProjectType } from "./types";
import { projectModule } from "./project";
import { domForm } from "./dom/domForm";
import { format } from 'date-fns';
import * as moment from "moment";

export class Todo {
    parentProject: string;
    priority: Priority;
    title: string;
    description: string;
    dueDate: Date;
    notes: string[];
    completed: boolean;
    
    constructor(title: string, priority: Priority, dueDate: Date, parentProject?: string,  description?: string) {
        this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.parentProject = parentProject
        this.description = description;
        this.notes = null;
        this.completed = false;
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

    addNewNote (noteToAdd: string) {
        this.notes.push(noteToAdd);
    }

    toggleCompleteStatus() {
        this.completed = !this.completed;
    }
}

// todoModule
export const todoModule = (() => {

    let completedTodosList: Todo[] = [];
   
    const newTodo = (title: string, priority: Priority, dueDate: Date, parentProject: string, description?: string) => {
        let newTodoObject = new Todo(title, priority, dueDate, parentProject, description);
        return newTodoObject;
    }

    const generateArrayOfTodosBasedOnDate = (date: Date, weekDate?: Date) => {
        let todosThatWillPopulateTableArray: Todo[] = [];

        if (!weekDate) {
            projectModule.listOfProjects.forEach(project => {
                project.children.forEach(todo => {
                    if(format(todo.dueDate, 'PP') === format(date, 'PP')) {
                        todosThatWillPopulateTableArray.push(todo);
                    }
                });
            });
        }
        else {
            projectModule.listOfProjects.forEach(project => {
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

    const editTodo = (projectTitle: string, todoTitle: string) => {
       
        // Identify Project
        let targetProject: ProjectType;
        let projectsList = projectModule.listOfProjects;

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

    const markTodoAsCompleted = (todo: Todo, event) => {  
        // Make todo status as completed
        todo.completed = true;
        
        // Add Todo to a list of completed Todos
        completedTodosList.push(todo);

        // Remove Todo from Table Row and parentProject.
        let todoRow: any = event.path[2];
        todoRow.remove();

        projectModule.removeTodoFromProject(todo, todo.parentProject);
    }
    
    return {
        completedTodosList: completedTodosList,
        newTodo: newTodo,
        generateArrayOfTodosBasedOnDate: generateArrayOfTodosBasedOnDate,
        editTodo: editTodo,
        markTodoAsCompleted: markTodoAsCompleted
    }
    
    })();
    