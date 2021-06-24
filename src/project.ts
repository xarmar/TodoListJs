// projectModule
export const projectModule = (() => {

    class Project {
        title: string;
        description: string;
        children: object[];
        
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
    
    const newProject = (title: string, description?: string) => {
        let newObject = new Project(title, description);
        return newObject;
    }
    
    const addTodoToProject = (todo: object, project: Project) => {
        project.children.push(todo);
    }
    
    return {
        newProject: newProject,
        addTodoToProject : addTodoToProject
    }
    
    })();