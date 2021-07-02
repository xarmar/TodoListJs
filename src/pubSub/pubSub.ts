import PubSub from 'pubsub-js';
import { todoModule } from "../todo";
import { domGrid } from "../dom/domGrid";
import { domNavBar } from "../dom/domNavBar";
import { projectModule } from "../project";
import { domForm } from '../dom/domForm';

// Navbar and LeftStickyNavBar DOM maniputalion is here
export const pubSubModule = (() => {

    const newTodoFormSubmission = 'newTodoFormSubmition';
    const newProjectFormSubmission = 'newProjectFormSubmission';

    const submitFormInfo = (title: string, description: string, priority?: string, dueDate?: Date, projectTitle?: string) => {
        // if priority and date are NOT null, then it's a todoForm
        if(priority != null && dueDate != null) {
            PubSub.publish(newTodoFormSubmission, {title, description, priority, dueDate, projectTitle});
        }
        // else its a projectForm
        else {
            PubSub.publish(newProjectFormSubmission, {title, description})
        }
    };

    const createNewTodo = PubSub.subscribe(newTodoFormSubmission, function(newTodoForm, {title, description, priority, dueDate, projectTitle}) {
        let newTodo = todoModule.newTodo(title, priority, dueDate, description);
        projectModule.appendTodoToProject(newTodo, projectTitle);
        domGrid.populateRightGrid(undefined, projectTitle, true);
    });
    
    const createNewProject = PubSub.subscribe(newProjectFormSubmission, function(newTodoForm, {title, description}) {
        let newProject = projectModule.newProject(title, description);
        projectModule.listofProjects.push(newProject);
        domGrid.updateSideBarProjects();
    });

    return  {
        newProjectFormSubmission: newProjectFormSubmission,
        submitFormInfo: submitFormInfo
    }

})();




