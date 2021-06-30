import { Priority, Todo, Project } from "./types";
import { helperfunction } from "./helperFunctions";
import { projectModule } from "./project";
import PubSub from 'pubsub-js';
import { todoModule } from "./todo";
import { node } from "webpack";

export const dom = (() => {

// Generates NavBar
const generateNavBar = () => {

// Create Header
const header = document.createElement('header');
header.id = 'header';
document.body.appendChild(header);

// NavBar Options
const navBar = document.createElement('nav');
navBar.id = 'navBar';
header.appendChild(navBar);

// Init Divs for lists
const leftHeaderDiv = document.createElement('div');
leftHeaderDiv.id = 'leftHeaderDiv';
const rightHeaderDiv = document.createElement('div');
rightHeaderDiv.id = 'rightHeaderDiv';

helperfunction.appendMultipleNodesToParent(navBar, leftHeaderDiv, rightHeaderDiv);

// Init left-li
const expander = document.createElement('p');
expander.innerText = '☰';
expander.classList.add('navOption');
expander.addEventListener('click', toggleLeftStickyNavBar)

leftHeaderDiv.appendChild(expander);

// Init right-li
const addTodo = document.createElement('p');
addTodo.innerText = '+';
addTodo.classList.add('navOption');
addTodo.addEventListener('click', addTodoPopUp);

const history = document.createElement('p');
history.innerText = '\u{1F56E}';
history.classList.add('navOption');

helperfunction.appendMultipleNodesToParent(rightHeaderDiv, addTodo, history);

}

// Runs when 'Expand' Menu in NavBar is Clicked
const toggleLeftStickyNavBar = () => {
    let grid = document.querySelector('#gridDiv');
    grid.classList.toggle('expandGrid');
    let stickyLeftDiv = document.querySelector('#stickyLeftDiv');
    stickyLeftDiv.classList.toggle('displayNone');
}

// Generates Grid
const generateGrid = () => {

    // create Div for grid
    const gridDiv = document.createElement('div');
    gridDiv.id = 'gridDiv';
    document.body.appendChild(gridDiv);

    // Create div for left side
    const stickyLeftDiv = document.createElement('div');
    stickyLeftDiv.id = 'stickyLeftDiv';
    gridDiv.appendChild(stickyLeftDiv);

    // Ceate div for right side
    const stickyRightDiv = document.createElement('div');
    stickyRightDiv.id = 'stickyRightDiv';
    gridDiv.appendChild(stickyRightDiv);


}

// Populates Left-Grid 
const populateLeftGrid = () => {
    let stickyLeftDiv = document.querySelector('#stickyLeftDiv');

    const todayTomorrowWeekDiv = document.createElement('div');
    todayTomorrowWeekDiv.id = 'todayTomorrowWeekDiv';
    stickyLeftDiv.appendChild(todayTomorrowWeekDiv);

    const optionsList = document.createElement('ul');
    optionsList.id = 'optionsList'
    todayTomorrowWeekDiv.appendChild(optionsList);

    // populate day options
    const today = document.createElement('li');
    today.id = 'today';
    today.innerText = 'Today'
    const tomorrow = document.createElement('li');
    tomorrow.id = 'tomorrow';
    tomorrow.innerText = 'Tomorrow';
    const week = document.createElement('li');
    week.id = 'week';
    week.innerText = 'Week';
    helperfunction.appendMultipleNodesToParent(optionsList, today, tomorrow, week);

    // Init displayProjectsDiv
    const projectDiv = document.createElement('div');
    projectDiv.id = 'projectDiv';
    stickyLeftDiv.appendChild(projectDiv);

    // add projects options
    const projects = document.createElement('p');
    projects.id = 'projects';
    projects.innerText = 'Projects'
    const expandProjectsArrow = document.createElement('p');
    expandProjectsArrow.id = 'expandProjectsArrow';
    expandProjectsArrow.innerText = '\u{02C5}';
    helperfunction.appendMultipleNodesToParent(projectDiv, projects, expandProjectsArrow);

    // display all Projects
    const listOfProjectsDiv = document.createElement('div');
    listOfProjectsDiv.id = 'listOfProjectsDiv';
    stickyLeftDiv.appendChild(listOfProjectsDiv);

    const projectUnorderedList = document.createElement('ul');
    projectUnorderedList.id = 'projectUnorderedList'
    listOfProjectsDiv.appendChild(projectUnorderedList);

    populateProjectsList();

    const addProject = document.createElement('p');
    addProject.id = 'addProject';
    addProject.innerHTML = "<span id = 'plus'>+</span> New Project"
    addProject.addEventListener('click', addProjectPopUp);
    listOfProjectsDiv.appendChild(addProject);
}

const populateRightGrid = (event) => {
    const stickyRightDiv = document.querySelector('#stickyRightDiv');

    // Remove previous Nodes on stickyRightDiv
    helperfunction.removeChildNodes(stickyRightDiv);

    // Create Div where elements will be appended
    const projectAndTodosDiv = document.createElement('div');
    projectAndTodosDiv.id = 'projectAndTodosDiv';
    stickyRightDiv.appendChild(projectAndTodosDiv);
    
    // Identify requested Project
    const projectTitle = event.target.innerText;
    let chosenProject: Project = projectModule.findProject(projectTitle);     

    // Create Header with chosenProject.title
    let projectHeader = document.createElement('p');
    projectHeader.innerText = chosenProject.title;
    projectHeader.id = 'projectHeader';
    projectAndTodosDiv.appendChild(projectHeader);

    // Label The Todo's that will be appended
    let labelTodoListDiv = document.createElement('div');
    labelTodoListDiv.id = 'labelTodoListDiv';
    projectAndTodosDiv.appendChild(labelTodoListDiv);

    let statusLabel = document.createElement('p');
    statusLabel.innerText = 'Status';

    let titleLabel = document.createElement('p');
    titleLabel.innerText = 'Title';

    let dateLabel = document.createElement('p');
    dateLabel.innerText = 'Due Date';

    let priorityLabel = document.createElement('p');
    priorityLabel.innerText = 'Priority';

    helperfunction.appendMultipleNodesToParent(labelTodoListDiv, statusLabel, titleLabel, dateLabel, priorityLabel);

    // Loop through Project's children Todo's
    let projectChildren = chosenProject.children
    projectChildren.forEach(todo => {
        let listTodosInRowsDiv = document.createElement('div');
        listTodosInRowsDiv.classList.add('listTodosInRowsDiv');

        let completed: boolean = todo.completed
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        

        let title: string = todo.title;
        let titleP = document.createElement('p');
        titleP.innerText = title

        let dueDate: Date = todo.dueDate;
        let dueDateP = document.createElement('p');
        let dueDateString = dueDate.toDateString();
        dueDateP.innerText = dueDateString

        let priority: string = todo.priority;
        let priorityImg = document.createElement('img');
        if (priority === 'low') {
            priorityImg.classList.add('lowPriority')
        }
        else if (priority === 'medium') {
            priorityImg.classList.add('mediumPriority');
        }
        else if (priority === 'high') {
            priorityImg.classList.add('highPriority');
        }

        helperfunction.appendMultipleNodesToParent(listTodosInRowsDiv, checkbox, titleP, dueDateP, priorityImg);
        projectAndTodosDiv.appendChild(listTodosInRowsDiv);
    });
}

// FORMS
let showingPopUp = false;

    // -------------------------TODO FORM --------------------------------------
        // Runs if '+' button in NavBar Clicked
const addTodoPopUp = () => {
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
    popUpHeader.innerText = 'Add New Todo'
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
    titleInput.setAttribute('type', 'text');
    titleInput.required = true;
    titleInput.autofocus = true;

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
    descriptionInput.setAttribute('maxlength', '75');
    descriptionInput.setAttribute('rows', '3');
    descriptionInput.setAttribute('placeholder', 'Description is optional...');


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

    const chooseProjectInput = document.createElement('input');
    chooseProjectInput.id = 'chooseProjectInput';
    chooseProjectInput.setAttribute('type', 'text');
    chooseProjectInput.setAttribute('list', 'projectOptions');
    chooseProjectInput.required = true;
    chooseProjectInput.addEventListener("click", clearChosenOption);

    helperfunction.appendMultipleNodesToParent(chooseProjectField, chooseProjectLabel, chooseProjectInput);

    // Give user options to append Todo to 
    const projectOptions = document.createElement('datalist');
    projectOptions.id = 'projectOptions';
    chooseProjectField.appendChild(projectOptions);

    let projectList = projectModule.listofProjects;

    projectList.forEach(project => {
        let title = project.title;

        let projectOption = document.createElement('option');
        projectOption.innerText = title
        projectOption.classList.add('projectOption');

        projectOptions.appendChild(projectOption);
    });

    // Add Buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.id = 'buttonsDiv';
    form.appendChild(buttonsDiv);

    const addButton = document.createElement('button');
    addButton.id = 'addButton';
    addButton.innerText = 'Add';

    const cancelButton = document.createElement('button');
    cancelButton.addEventListener('click', todoAddButtonClicked);
    cancelButton.id = 'cancelButton';
    cancelButton.innerText = 'Cancel';

    helperfunction.appendMultipleNodesToParent(buttonsDiv, addButton, cancelButton);
}

        // Todo Form is Submited - Capture User Input
const captureForm = (event) => {
    // prevent page from refreshing
    event.preventDefault();

    let idOfForm = event.target.id;

    // get form data
    let title:string = (<HTMLInputElement>document.querySelector('input#titleInput')).value;
    let description:string = (<HTMLTextAreaElement>document.querySelector('textarea#descriptionInput')).value;

    // Prevents 'title' being blank
    if (helperfunction.isBlank(title)) {
        return
    }

    if (idOfForm === 'todoForm') {
        var priority:string = (<HTMLInputElement>document.querySelector('input[name=priorityLevel]:checked')).value;
        let date: string = (<HTMLInputElement>document.querySelector('input#dueDateInput')).value;
        var dueDate: Date = new Date(date);
        var projectTitle:string = (<HTMLInputElement>document.querySelector('input#chooseProjectInput')).value;
    }
    submitFormInfo(title, description, priority, dueDate, projectTitle);

    closePopUp();
}
    // ------------------------ PROJECT FORM -----------------------------------
        // Runs if 'newProject' button in leftStickyNavBar Clicked
const addProjectPopUp = () => {
    if (showingPopUp) {
        return
    }

    toggleLeftStickyNavBar();

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
    popUpDiv.appendChild(form);

// Set Header at the top of the form
    const popUpHeader = document.createElement('p');
    popUpHeader.id = 'popUpHeader';
    popUpHeader.innerText = 'Add New Project'
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
    titleInput.setAttribute('maxlength', '14');
    titleInput.required = true;
    titleInput.autofocus = true;

    helperfunction.appendMultipleNodesToParent(titleField, titleLabel, titleInput);

    // Ask user for 'description' of Project
    const descriptionField = document.createElement('p');
    descriptionField.id = 'descriptionField';
    titleAndDescriptionDiv.appendChild(descriptionField);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.innerText = 'Description : ';
    descriptionLabel.setAttribute('for', 'descriptionInput');

    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'descriptionInput';
    descriptionInput.setAttribute('form', 'form');
    descriptionInput.setAttribute('maxlength', '75');
    descriptionInput.setAttribute('rows', '3');
    descriptionInput.setAttribute('placeholder', 'Description is optional...');

    helperfunction.appendMultipleNodesToParent(descriptionField, descriptionLabel, descriptionInput);

    // Add Buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.id = 'buttonsDiv';
    form.appendChild(buttonsDiv);

    const addButton = document.createElement('button');
    addButton.addEventListener('click', captureForm);
    addButton.id = 'addButton';
    addButton.innerText = 'Add';

    const cancelButton = document.createElement('button');
    cancelButton.addEventListener('click', closePopUp);
    cancelButton.id = 'cancelButton';
    cancelButton.innerText = 'Cancel';

    helperfunction.appendMultipleNodesToParent(buttonsDiv, addButton, cancelButton);
}

const clearChosenOption = (event) => {
    event.target.value = null;
}

const populateProjectsList = () => {
    let projectUnorderedList = document.querySelector('#projectUnorderedList');
    
    const projectsArray = projectModule.listofProjects;

    projectsArray.forEach(project => {
        let ProjectToBeListed = document.createElement('li');
        ProjectToBeListed.classList.add('project')
        ProjectToBeListed.addEventListener('click', sideBarProjectClicked);
        ProjectToBeListed.innerText = project.title;
        projectUnorderedList.appendChild(ProjectToBeListed);
    });
}

const updateProjectsInDom = () => {
    let nodeToRemove = document.querySelector('#projectUnorderedList');
    helperfunction.removeChildNodes(nodeToRemove);

    populateProjectsList();
}

// Closes PopUps whenever the Cancel Button is clicked or when a Form is sucessfully submitted
const closePopUp = () => {
    let popUpDiv = document.querySelector('#popUpDiv');
    popUpDiv.remove();
    showingPopUp = false;
}

// PUBSUB ----------------------- PUBSUB ----------------------------- PUBSUB
const newTodoFormSubmission = 'newTodoFormSubmition';
const newProjectFormSubmission = 'newProjectFormSubmission';
const sideBarProjectClick = 'sideBarProjectClick';
const todoAddButtonClick = 'todoAddButtonClick';

const sideBarProjectClicked = (event) => {
    PubSub.publish(sideBarProjectClick, {event});
}

const sideBarProjectListener = PubSub.subscribe(sideBarProjectClick, function (sideBarProjectClick, event) {
    populateRightGrid(event.event);
    toggleLeftStickyNavBar();
});

const todoAddButtonClicked = (event) => {
    PubSub.publish(todoAddButtonClick, {event})
}

const todoAddButtonListener = PubSub.subscribe(todoAddButtonClick, function (todoAddButtonClicked, event) {
    captureForm(event.event);
    closePopUp();

});


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
});

const createNewProject = PubSub.subscribe(newProjectFormSubmission, function(newTodoForm, {title, description}) {
    let newProject = projectModule.newProject(title, description);
    projectModule.listofProjects.push(newProject);
    updateProjectsInDom();
});

return {
    generateNavBar: generateNavBar,
    generateGrid: generateGrid,
    populateLeftGrid: populateLeftGrid
}
})();