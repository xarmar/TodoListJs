import PubSub from 'pubsub-js';
import { Todo, todoModule } from "../todo";
import { domGrid } from "../dom/domGrid";
import { projectModule, listOfProjects, Project } from "../project";
import { saveLocalStorage } from '../localStorage';


// Handles forms submissions and creates Todos and projects based on form input
export const pubSubModule = (() => {

    const newTodoFormSubmission = 'newTodoFormSubmition';
    const editTodoFormSubmission = 'editTodoFormSubmission';
    const newProjectFormSubmission = 'newProjectFormSubmission';
    const editProjectFormSubmission = 'editProjectFormSubmission';

    const submitFormInfo = (title: string, description: string, priority?: string, dueDate?: Date, 
        projectTitle?: string, editOrNew?: string, titleOfProjectToBeEdited?:string, todoToBeEditedTitle?: string) => {
        
        // if priority and date are NOT null, then it's a todoForm
        if(priority != null && dueDate != null) {
            if (editOrNew === 'new') {
                // If it's a new Todo
                PubSub.publish(newTodoFormSubmission, {title, priority, dueDate, projectTitle, description});
            }
            // if user is editing a todo, publish the title of Project and Todo too.
            else {
                PubSub.publish(editTodoFormSubmission, (
                    {title, priority, dueDate, projectTitle, description, titleOfProjectToBeEdited, todoToBeEditedTitle}));
            }
        }

        // If it's a projectForm, just publish title
        else {
            if (editOrNew === 'new') {
                PubSub.publish(newProjectFormSubmission, {title})
            }
            else {
                PubSub.publish(editProjectFormSubmission, {title, projectTitle})
            }
        }
    };

    // create new todo and populate grid with that todo
    const createNewTodo = PubSub.subscribe(newTodoFormSubmission, function(newTodoForm, 
        {title, priority, dueDate, projectTitle, description}) {

        let newTodo: Todo = todoModule.newTodo(title, priority, dueDate, projectTitle, false, description);

        // append todo to project
        projectModule.appendTodoToProject(newTodo, projectTitle);

        // populate grid with new Todo.
        domGrid.populateRightGrid(undefined, projectTitle);
        saveLocalStorage();
    });

    // edit an existing todo
    const editTodo = PubSub.subscribe(editTodoFormSubmission, function(editTodoForm, 
        {title, priority, dueDate, projectTitle, description, titleOfProjectToBeEdited, todoToBeEditedTitle}) {
        
        // Find Todo that will be edited
        let todoThatWillBeEdited: Todo = todoModule.getTodoByTitle(todoToBeEditedTitle, titleOfProjectToBeEdited);

        // remove the Todo from the previous projecT
        projectModule.removeTodoFromProject(todoThatWillBeEdited, titleOfProjectToBeEdited);

        // Edit Todo by setting new properties 
        todoThatWillBeEdited.changeTitle(title);
        todoThatWillBeEdited.changePriority(priority);
        todoThatWillBeEdited.changeDueDate(dueDate);
        todoThatWillBeEdited.changeParentProject(projectTitle);
        todoThatWillBeEdited.changeDescription(description);

        // Append edited Todo to the new ParentProject
        projectModule.appendTodoToProject(todoThatWillBeEdited, projectTitle);

        domGrid.populateRightGrid(undefined, projectTitle);

        saveLocalStorage();
    });
    
    const createNewProject = PubSub.subscribe(newProjectFormSubmission, function(newTodoForm, {title}) {
        let newProject = projectModule.newProject(title);
        listOfProjects.push(newProject);
        domGrid.updateSideBarProjects();
        saveLocalStorage();
    });

    const editProject = PubSub.subscribe(editProjectFormSubmission, function(newTodoForm, {title, projectTitle}) {
       let newTitle = title;
       let originalTitle = projectTitle;

        // identify project to edit
       let projectToEdit: Project = projectModule.getProjectByTitle(originalTitle);
    
        // make sure Todos of the projectToEdit change parentProject to newTitle
       projectToEdit.children.forEach(todo => {
           todo.parentProject = newTitle;
       });

        //change title of projectToEdit
       projectToEdit.changeTitle(newTitle);
       
        // update sidebar and screen with new title
       domGrid.updateSideBarProjects();
       domGrid.populateRightGrid(undefined, newTitle);

       saveLocalStorage();

    });

    return  {
        newProjectFormSubmission: newProjectFormSubmission,
        submitFormInfo: submitFormInfo
    }

})();





