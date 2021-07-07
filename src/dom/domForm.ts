import { helperfunction } from "../helperFunctions";
import { listOfProjects, Project} from "../project";
import { pubSubModule } from "../pubSub/pubSub";
import { Todo } from "../todo";
import { domNavBar } from "./domNavBar";

// Forms DOM maniputalion is here
export const domForm = (() => {

    let showingPopUp = false;

    // TODO FORM

    // Runs popUp if '+' button in NavBar Clicked OR when user clicks to 'edit' Todo
    const todoPopUp = (project?: Project, todo?: Todo) => {
        
        // If a popUp is already open - don't open another popUp
        if (showingPopUp) {
            return
        }
        
        showingPopUp = true;
        let gridDiv = document.querySelector('#gridDiv');

        // Create PopUpDiv that will append to gridDiv
        const popUpDiv = document.createElement('div');
        popUpDiv.id = 'popUpDiv';
        gridDiv.appendChild(popUpDiv);

        // Create Form where user will be prompted for choices
        const form = document.createElement('form');
        form.id = 'todoForm';
        form.onsubmit = captureForm;
        popUpDiv.appendChild(form);

        // Set Header at the top of the form
        const popUpHeader = document.createElement('p');
        popUpHeader.id = 'popUpHeader';

        // If its an edit request
        if (project && todo) {
            form.setAttribute('data-type', 'edit');
            form.setAttribute('data-project', project.title);
            form.setAttribute('data-todo', todo.title);
            popUpHeader.innerText = 'Edit Todo'
        }

        // If it's just a navBar '+' click'
        else {
            form.setAttribute('data-type', 'new')
            popUpHeader.innerText = 'Add New Todo'
        }
    
        form.appendChild(popUpHeader);

        // Init Div that will contain 'title' and 'description' of todo
        const titleAndDescriptionDiv = document.createElement('div');
        titleAndDescriptionDiv.id = 'titleAndDescriptionDiv';
        form.appendChild(titleAndDescriptionDiv);

        // Ask user for 'title' of Todo
        const titleField = document.createElement('p');
        titleField.id = 'titleField';
        titleAndDescriptionDiv.appendChild(titleField);
        
        const titleLabel = document.createElement('label');
        titleLabel.innerText = 'Title: ';
        titleLabel.setAttribute('for', 'titleInput');

        const titleInput = document.createElement('input');
        titleInput.id = 'titleInput'
        titleInput.required = true;
        titleInput.autofocus = true;
        titleInput.setAttribute('type', 'text');
       
        // If its an edit request, set textContent of titleInput to todo.title
        if (project && todo) {
            titleInput.value = todo.title;
        }

        helperfunction.appendMultipleNodesToParent(titleField, titleLabel, titleInput);

    // Ask user for 'description' of Todo
        const descriptionField = document.createElement('p');
        descriptionField.id = 'descriptionField';
        titleAndDescriptionDiv.appendChild(descriptionField);

        const descriptionLabel = document.createElement('label');
        descriptionLabel.innerText = 'Description : ';
        descriptionLabel.setAttribute('for', 'descriptionInput');

        const descriptionInput = document.createElement('textarea');
        descriptionInput.id = 'descriptionInput';
        descriptionInput.setAttribute('form', 'form');
        descriptionInput.setAttribute('maxlength', '40');
        descriptionInput.setAttribute('rows', '3');
        descriptionInput.setAttribute('placeholder', 'Description is optional...');
        
        // If its an edit request, set textContent of descriptionInput to todo.description
        if (project && todo) {
            descriptionInput.innerText = todo.description;
        }

        helperfunction.appendMultipleNodesToParent(descriptionField, descriptionLabel, descriptionInput);

    // Init Div that will contain 'priority' and 'dueDate' of todo
        const priorityAndDueDateDiv = document.createElement('div');
        priorityAndDueDateDiv.id = 'priorityAndDueDateDiv';
        form.appendChild(priorityAndDueDateDiv);

    // Ask user for 'priority' of Todo
        const priorityField = document.createElement('p');
        priorityField.id = 'priorityField';
        priorityField.innerText = 'Priority:';
        priorityAndDueDateDiv.appendChild(priorityField);

        // Give options to choose from:
        const lowPriorityLabel = document.createElement('label');
        lowPriorityLabel.setAttribute('for', 'lowPriority');

        const lowPriority = document.createElement('input');
        lowPriority.setAttribute('type', 'radio');
        lowPriority.setAttribute('name', 'priorityLevel');
        lowPriority.setAttribute('value', 'low');
        lowPriority.id = 'lowPriority';
        lowPriority.classList.add('priorityOption');
        lowPriority.required = true;

        const lowPriorityImage = document.createElement('img');
        lowPriorityImage.id = 'lowPriorityImage';
        lowPriorityImage.setAttribute('title', 'low');

        helperfunction.appendMultipleNodesToParent(lowPriorityLabel, lowPriority, lowPriorityImage);

        const mediumPriorityLabel = document.createElement('label');
        mediumPriorityLabel.setAttribute('for', 'mediumPriority');

        const mediumPriority = document.createElement('input');
        mediumPriority.setAttribute('type', 'radio');
        mediumPriority.setAttribute('name', 'priorityLevel');
        mediumPriority.setAttribute('value', 'medium');
        mediumPriority.id = 'mediumPriority';
        lowPriority.classList.add('priorityOption');

        const mediumPriorityImage = document.createElement('img');
        mediumPriorityImage.id = 'mediumPriorityImage';
        mediumPriorityImage.setAttribute('title', 'medium');

        helperfunction.appendMultipleNodesToParent(mediumPriorityLabel, mediumPriority, mediumPriorityImage);

        const highPriorityLabel = document.createElement('label');
        highPriorityLabel.setAttribute('for', 'highPriority');

        const highPriority = document.createElement('input');
        highPriority.setAttribute('type', 'radio');
        highPriority.setAttribute('name', 'priorityLevel');
        highPriority.setAttribute('value', 'high');
        highPriority.id = 'highPriority';
        lowPriority.classList.add('priorityOption');

        const highPriorityImage = document.createElement('img');
        highPriorityImage.id = 'highPriorityImage';
        highPriorityImage.setAttribute('title', 'high');

        // If its an edit request, set priority of Todo
        if (project && todo) {
            if(todo.priority === 'low') {
                lowPriority.setAttribute('checked', 'checked');
            }
            else if (todo.priority === 'medium') {
                mediumPriority.setAttribute('checked', 'checked');
            }
            else if (todo.priority === 'high') {
                highPriority.setAttribute('checked', 'checked');
            }
        }

        helperfunction.appendMultipleNodesToParent(highPriorityLabel, highPriority, highPriorityImage);

        // Append everything to a 'priorityDiv'
        const priorityDiv = document.createElement('div');
        priorityDiv.id = 'priorityDiv';
        helperfunction.appendMultipleNodesToParent(priorityDiv, lowPriorityLabel, mediumPriorityLabel, highPriorityLabel);

        // Append priorityDiv to priorityField
        priorityField.appendChild(priorityDiv);


    // Ask user for dueDate

        const dueDateField = document.createElement('p');
        dueDateField.id = 'dueDateField';
        priorityAndDueDateDiv.appendChild(dueDateField);

        const dueDateLabel = document.createElement('label');
        dueDateLabel.innerText = 'Due Date: ';
        dueDateLabel.id = 'dueDateLabel';
        dueDateLabel.setAttribute('for', 'dueDateInput');
        dueDateLabel.setAttribute('aria-label', 'required');

        // get todays date
        const today = helperfunction.currentDate();

        const dueDateInput = document.createElement('input');
        dueDateInput.id = 'dueDateInput';
        dueDateInput.setAttribute('type', 'date'); 
        dueDateInput.setAttribute('min', today);   
        dueDateInput.required = true;

        // If its an edit request, set dueDateInput to todo.dueDate
        if (project && todo) {
            dueDateInput.valueAsDate = todo.dueDate;
        }

        helperfunction.appendMultipleNodesToParent(dueDateField, dueDateLabel, dueDateInput);

        // Ask user what Project to append the Todo to

        const chooseProjectDiv = document.createElement('div');
        chooseProjectDiv.id = 'chooseProjectDiv';
        form.appendChild(chooseProjectDiv);

        const chooseProjectField = document.createElement('p');
        chooseProjectField.id = 'chooseProjectField';
        chooseProjectDiv.appendChild(chooseProjectField);

        const chooseProjectLabel = document.createElement('label');
        chooseProjectLabel.innerText = 'Project: ';
        chooseProjectLabel.id = 'chooseProjectLabel';
        chooseProjectLabel.setAttribute('for', 'chooseProjectInput');
        chooseProjectLabel.setAttribute('aria-label', 'required');

        const chooseProjectInput = document.createElement('select');
        chooseProjectInput.id = 'chooseProjectInput';
        chooseProjectInput.setAttribute('type', 'text');
        chooseProjectInput.setAttribute('list', 'projectOptions');
        chooseProjectInput.required = true;

        helperfunction.appendMultipleNodesToParent(chooseProjectField, chooseProjectLabel, chooseProjectInput);

        // Give user options to append Todo to 

        let projectList = listOfProjects;

        projectList.forEach(proj => {
            let title = proj.title;

            let projectOption = document.createElement('option');
            projectOption.innerText = title
            projectOption.classList.add('projectOption');

            // If its an edit request, set chooseProjectInput to todo.parentProject
            if (project && todo && title === project.title) {
                projectOption.setAttribute('selected', 'selected');;
            }

            chooseProjectInput.appendChild(projectOption);
        });

        // Add Buttons
        const buttonsDiv = document.createElement('div');
        buttonsDiv.id = 'buttonsDiv';
        form.appendChild(buttonsDiv);

        const addButton = document.createElement('button');
        addButton.id = 'addButton';
         
        // If its an edit request, set addButton Text to Edit
        if (project && todo) {
            addButton.innerText = 'Edit';
        }
        else {
            addButton.innerText = 'Add';
        }

        const cancelButton = document.createElement('button');
        cancelButton.addEventListener('click', function(event) {
            event.preventDefault();
            closePopUp();
        });
        cancelButton.id = 'cancelButton';
        cancelButton.innerText = 'Cancel';

        helperfunction.appendMultipleNodesToParent(buttonsDiv, addButton, cancelButton);
    }
    
    // PROJECT FORM

    // Runs popUp if 'newProject' button in leftStickyNavBar Clicked
    const projectPopUp = (event?: any) => {
        if (showingPopUp) {
            return
        }
        
        domNavBar.closeLeftStickyNavBar();

        let editRequest:boolean;
        let projectName:string;

        // If it's a request to edit Project, get Project Name
        if (event.target.id === 'editProject') {
            editRequest = true;
            projectName = event.target.dataset.project;
        }
        else {
            editRequest = false;
        }


        showingPopUp = true;
        let gridDiv = document.querySelector('#gridDiv');

        // Create PopUpDiv that will append to gridDiv
        const popUpDiv = document.createElement('div');
        popUpDiv.id = 'popUpDiv';
        gridDiv.appendChild(popUpDiv);

        // Create Form where user will be prompted for choices
        const form = document.createElement('form');
        form.id = 'projectForm';
        form.onsubmit = captureForm;

        if (editRequest) {
            form.setAttribute('data-type', 'edit');
            form.setAttribute('data-project', projectName);
        }

        else {
            form.setAttribute('data-type', 'new');
        }
        popUpDiv.appendChild(form);

        // Set Header at the top of the form
        const popUpHeader = document.createElement('p');
        popUpHeader.id = 'popUpHeader';

        // If user is editing a Project
        if (editRequest) {
            popUpHeader.innerText = 'Edit Project'
        }
        else {
            popUpHeader.innerText = 'Add New Project'
        }

        form.appendChild(popUpHeader);

    // Init Div that will contain 'title' and 'description' of Project
        const titleAndDescriptionDiv = document.createElement('div');
        titleAndDescriptionDiv.id = 'titleAndDescriptionDiv';
        form.appendChild(titleAndDescriptionDiv);

    // Ask user for 'title' of Project
        const titleField = document.createElement('p');
        titleField.id = 'titleField';
        titleAndDescriptionDiv.appendChild(titleField);
        
        const titleLabel = document.createElement('label');
        titleLabel.innerText = 'Title: ';
        titleLabel.setAttribute('for', 'titleInput');

        const titleInput = document.createElement('input');
        titleInput.id = 'titleInput'
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('maxlength', '15');
        titleInput.required = true;
        titleInput.autofocus = true;
        if (editRequest) {
            titleInput.value = projectName;
        }

        helperfunction.appendMultipleNodesToParent(titleField, titleLabel, titleInput);

        // Add Buttons
        const buttonsDiv = document.createElement('div');
        buttonsDiv.id = 'buttonsDiv';
        form.appendChild(buttonsDiv);

        const addButton = document.createElement('button');
        addButton.id = 'addButton';

        if(editRequest) {
            addButton.innerText = 'Edit';
        }

        else {
            addButton.innerText = 'Add';
        }

        const cancelButton = document.createElement('button');
        cancelButton.addEventListener('click', function(event) {
            event.preventDefault();
            closePopUp();
            domNavBar.closeLeftStickyNavBar();;
        });
        cancelButton.id = 'cancelButton';
        cancelButton.innerText = 'Cancel';

        helperfunction.appendMultipleNodesToParent(buttonsDiv, addButton, cancelButton);
    }

    // When a Form is Submitted, capture User Input
    const captureForm = (event) => {
        // prevent page from refreshing
        event.preventDefault();

        let idOfForm = event.target.id;

        // get form data - type can be 'todo' or project
        let title:string = (<HTMLInputElement>document.querySelector('input#titleInput')).value;
        let type: string = event.srcElement.dataset.type;

        // Prevents 'title' being blank
        if (helperfunction.isBlank(title)) {
            return
        }

        // If it's a todoForm, capture more fields
        if (idOfForm === 'todoForm') {
            var description:string = (<HTMLTextAreaElement>document.querySelector('textarea#descriptionInput')).value;
            var priority:string = (<HTMLInputElement>document.querySelector('input[name=priorityLevel]:checked')).value;
            let date: string = (<HTMLInputElement>document.querySelector('input#dueDateInput')).value;
            var dueDate: Date = new Date(date);
            var projectTitle:string = (<HTMLSelectElement>document.querySelector('select#chooseProjectInput')).value;

            // if user if editing a Todo, grab name of project and todo
            if(type === 'edit') {
                var projectToBeEditedTitle = event.srcElement.dataset.project;
                var todoToBeEditedTitle = event.srcElement.dataset.todo;
            }
        }

        // If it's a projectForm, capture projectTitle extra field so that we know original name of Project
        else {
            var projectTitle: string = event.target.dataset.project;
        }

        // Submit form info. Type can be 'project' for projects AND 'new' or 'edit' for Todos
        pubSubModule.submitFormInfo(title, description, priority, dueDate, projectTitle, type, projectToBeEditedTitle, todoToBeEditedTitle);

        closePopUp();
        domNavBar.closeLeftStickyNavBar();
    }

    // Closes PopUps whenever the Cancel Button is clicked or when a Form is sucessfully submitted
    const closePopUp = () => {
        let popUpDiv = document.querySelector('#popUpDiv');
        popUpDiv.remove();
        showingPopUp = false;
    }
    
    return  {
        todoPopUp: todoPopUp,
        projectPopUp: projectPopUp,
        captureForm: captureForm,
        closePopUp: closePopUp
    }
})();
