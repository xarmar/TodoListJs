import { Priority, ProjectType } from "./types";
import { Todo } from "./todo";

export const projectModule = (() => {

    class Project {
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

    const listOfProjects: Project[] = [];

    const newProject = (title: string) => {
        let newProj = new Project(title);
        return newProj;
    }

    const appendTodoToProject = (todo: Todo, projectTitle: string) => {
        listOfProjects.forEach(project => {
            if(project.title === projectTitle) {
                project.children.push(todo);
            }
        });
    }

    const removeTodoFromProject = (todo: Todo, parentProjectTitle: string) => {
        
        let targetProject: ProjectType = findProject(parentProjectTitle);
        let allTodosInTargetProject: Todo[] = targetProject.children;

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