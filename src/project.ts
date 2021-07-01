import { Priority, Todo, Project } from "./types";

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
            }
        });
    }

    const findProject = (projectTitle: string) => {
        let projectToReturn;
        listOfProjects.forEach(project => {
            if(projectTitle === project.title) {
                projectToReturn = project
            }
        });
        return projectToReturn
    }

    return {
        listofProjects: listOfProjects,
        newProject: newProject,
        addTodoToProject : addTodoToProject,
        appendTodoToProject: appendTodoToProject,
        findProject: findProject
    }
    
    })();