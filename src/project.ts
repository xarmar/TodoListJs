import { Priority, TodoType, ProjectType } from "./types";

export const projectModule = (() => {

    class Project {
        title: string;
        description: string;
        children: TodoType[];
        
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

    const listOfProjects: Project[] = [];

    const newProject = (title: string, description?: string) => {
        let newObject = new Project(title, description);
        return newObject;
    }

    const appendTodoToProject = (todo: TodoType, projectTitle: string) => {
        listOfProjects.forEach(project => {
            if(project.title === projectTitle) {
                project.children.push(todo);
            }
        });
    }

    const removeTodoFromProject = (todo: TodoType, parentProjectTitle: string) => {
        
        let targetProject: ProjectType = findProject(parentProjectTitle);
        let allTodosInTargetProject: TodoType[] = targetProject.children;

        let indexOfTodoToRemove = allTodosInTargetProject.indexOf(todo);

        allTodosInTargetProject.splice(indexOfTodoToRemove, 1);
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
        listOfProjects: listOfProjects,
        newProject: newProject,
        removeTodoFromProject : removeTodoFromProject,
        appendTodoToProject: appendTodoToProject,
        findProject: findProject
    }
    
    })();