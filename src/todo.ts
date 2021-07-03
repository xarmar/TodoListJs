import { Priority, TodoType, Project } from "./types";
import { projectModule } from "./project";
import { format } from 'date-fns';
import * as moment from "moment";

// todoModule
export const todoModule = (() => {
    
    class Todo {
        parentProject: string;
        priority: Priority;
        title: string;
        description: string;
        dueDate: Date;
        notes: string[];
        completed: boolean;
        
        constructor(title: string, priority: Priority, dueDate: Date, description?: string) {
            this.title = title;
            this.priority = priority;
            this.description = description;
            this.dueDate = dueDate;
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
    
    const newTodo = (title: string, priority: Priority, dueDate: Date, description?: string) => {
        let newTodoObject = new Todo(title, priority, dueDate, description);
        return newTodoObject;
    }

    const generateArrayOfTodosBasedOnDate = (date: Date, weekDate?: Date) => {
        let todosThatWillPopulateTableArray: TodoType[] = [];

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
    
    return {
        newTodo: newTodo,
        generateArrayOfTodosBasedOnDate: generateArrayOfTodosBasedOnDate
    }
    
    })();
    