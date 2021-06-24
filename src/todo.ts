// todoModule
export const todoModule = (() => {

    type Priority = 'low' | 'medium' | 'high';
    
    class Todo {
        parentProject: string;
        priority: Priority;
        title: string;
        description: string;
        dueDate: Date;
        notes: string[];
        completed: boolean;
        
        constructor(title: string, priority: Priority, description?: string) {
            this.title = title;
            this.priority = priority;
            this.description = description;
            // this.dueDate = dueDate;
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
    
    const newTodo = (title: string, priority: Priority, description?: string) => {
        let newTodoObject = new Todo(title, priority, description);
        return newTodoObject;
    }
    
    return {
        newTodo: newTodo,
    }
    
    })();
    