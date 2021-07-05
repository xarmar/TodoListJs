import PubSub from 'pubsub-js';
import { todoModule } from "../todo";
import { domGrid } from "../dom/domGrid";
import { domNavBar } from "../dom/domNavBar";
import { projectModule } from "../project";
import { domForm } from '../dom/domForm';
import { ProjectType, TodoType } from '../types';

// Navbar and LeftStickyNavBar DOM maniputalion is here
export const pubSubModule = (() => {

    const newTodoFormSubmission = 'newTodoFormSubmition';
    const editTodoFormSubmission = 'editTodoFormSubmission';
    const newProjectFormSubmission = 'newProjectFormSubmission';

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

        // If it's a projectForm, just publish title and description
        else {
            PubSub.publish(newProjectFormSubmission, {title, description})
        }
    };

    const createNewTodo = PubSub.subscribe(newTodoFormSubmission, function(newTodoForm, 
        {title, priority, dueDate, projectTitle, description}) {

        let newTodo = todoModule.newTodo(title, priority, dueDate, projectTitle, description);
        projectModule.appendTodoToProject(newTodo, projectTitle);
        domGrid.populateRightGrid(undefined, projectTitle);
    });

    const editTodo = PubSub.subscribe(editTodoFormSubmission, function(editTodoForm, 
        {title, priority, dueDate, projectTitle, description, titleOfProjectToBeEdited, todoToBeEditedTitle}) {
        
        // find Project by it's title
        let beforeEditParentProject: ProjectType = projectModule.findProject(titleOfProjectToBeEdited);
        let beforeEditParentProjectChildren: TodoType[] = beforeEditParentProject.children;

        // init variable that stores the todo that will be edited
        let todoThatWillBeEdited: TodoType;
        
        // find todo that will be edited
        beforeEditParentProjectChildren.forEach(todo => {
            if(todo.title === todoToBeEditedTitle) {
                todoThatWillBeEdited = todo;
            }
        });

        // remove the Todo from the previous projec
        projectModule.removeTodoFromProject(todoThatWillBeEdited, titleOfProjectToBeEdited);

        // Edit Todo by setting new properties 
        todoThatWillBeEdited.title = title;
        todoThatWillBeEdited.priority = priority;
        todoThatWillBeEdited.dueDate = dueDate;
        todoThatWillBeEdited.parentProject = projectTitle;
        todoThatWillBeEdited.description = description;

        // Append edited Todo to the new ParentProject
        projectModule.appendTodoToProject(todoThatWillBeEdited, projectTitle);

        domGrid.populateRightGrid(undefined, projectTitle);
    });
    
    const createNewProject = PubSub.subscribe(newProjectFormSubmission, function(newTodoForm, {title}) {
        let newProject = projectModule.newProject(title);
        projectModule.listOfProjects.push(newProject);
        domGrid.updateSideBarProjects();
    });

    return  {
        newProjectFormSubmission: newProjectFormSubmission,
        submitFormInfo: submitFormInfo
    }

})();





