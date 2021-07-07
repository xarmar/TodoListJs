import { domGrid } from "./dom/domGrid";
import { helperfunction } from "./helperFunctions";
import { Todo } from "./todo";

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

export const listOfProjects: Project[] = [];


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

    }

    const appendTodoToProject = (todo: Todo, projectTitle: string) => {
        listOfProjects.forEach(project => {
            if(project.title === projectTitle) {
                project.children.push(todo);
            }
        });
    }

    const removeTodoFromProject = (todo: Todo, parentProjectTitle: string) => {
        
        let targetProject: Project = getProjectByTitle(parentProjectTitle);
        let allTodosInTargetProject: Todo[] = targetProject.children;

        let indexOfTodoToRemove = allTodosInTargetProject.indexOf(todo);

        allTodosInTargetProject.splice(indexOfTodoToRemove, 1);
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