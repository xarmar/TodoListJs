// projectModule
type Priority = 'low' | 'medium' | 'high';

type Todo = {
    parentProject: string;
    priority: Priority;
    title: string;
    description: string;
    dueDate: Date;
    notes: string[];
    completed: boolean;
}

export const projectModule = (() => {

    class Project {
        title: string;
        description: string;
        children: Todo[];
        
        constructor(title: string, description?: string) {
            this.title = title;
            this.description = description;
            this.children = [];
        }
    
        changeTitle (newTitle: string) {
            this.title = newTitle;
        }
    
        changeDescription (newDescription: string) {
            this.description = newDescription;
        }
    }

    const listOfProjects: Project[] = []

    const newProject = (title: string, description?: string) => {
        let newObject = new Project(title, description);
        return newObject;
    }
    
    const addTodoToProject = (todo: Todo, project: Project) => {
        project.children.push(todo);
    }

    const appendTodoToProject = (todo: Todo, projectTitle: string) => {
        listOfProjects.forEach(project => {
            if(project.title === projectTitle) {
                project.children.push(todo);
                console.log(project);
            }
        });

    }

    return {
        listofProjects: listOfProjects,
        newProject: newProject,
        addTodoToProject : addTodoToProject,
        appendTodoToProject: appendTodoToProject
    }
    
    })();