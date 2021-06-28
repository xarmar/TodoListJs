import { appendMultipleNodesToParent } from "./helperFunctions";
import PubSub from 'pubsub-js';
import { add } from "date-fns";

export const dom = (() => {

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

appendMultipleNodesToParent(navBar, leftHeaderDiv, rightHeaderDiv);

// Init left-li
const expander = document.createElement('p');
expander.innerText = '☰';
expander.classList.add('navOption');
expander.addEventListener('click', PubSubExpanderClicked)

leftHeaderDiv.appendChild(expander);

// Init right-li
const addTodo = document.createElement('p');
addTodo.innerText = '+';
addTodo.classList.add('navOption');
addTodo.addEventListener('click', addTodoPopUp);

const history = document.createElement('p');
history.innerText = '\u{1F56E}';
history.classList.add('navOption');

appendMultipleNodesToParent(rightHeaderDiv, addTodo, history);

}

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
    appendMultipleNodesToParent(optionsList, today, tomorrow, week);

    // Init displayProjectsDiv
    const displayProjectsDiv = document.createElement('div');
    displayProjectsDiv.id = 'displayProjectsDiv';
    stickyLeftDiv.appendChild(displayProjectsDiv);

    // add projects options
    const projects = document.createElement('p');
    projects.id = 'projects';
    projects.innerText = 'Projects'
    const expandProjectsArrow = document.createElement('p');
    expandProjectsArrow.id = 'expandProjectsArrow';
    expandProjectsArrow.innerText = '\u{02C5}';
    appendMultipleNodesToParent(displayProjectsDiv, projects, expandProjectsArrow);

}

let showingPopUp = false;
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

    appendMultipleNodesToParent(titleField, titleLabel, titleInput);

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




    appendMultipleNodesToParent(descriptionField, descriptionLabel, descriptionInput);

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
    lowPriority.required = true;

    const lowPriorityImage = document.createElement('img');
    lowPriorityImage.id = 'lowPriorityImage';

    appendMultipleNodesToParent(lowPriorityLabel, lowPriority, lowPriorityImage);

    const mediumPriorityLabel = document.createElement('label');
    mediumPriorityLabel.setAttribute('for', 'mediumPriority');

    const mediumPriority = document.createElement('input');
    mediumPriority.setAttribute('type', 'radio');
    mediumPriority.setAttribute('name', 'priorityLevel');
    mediumPriority.setAttribute('value', 'medium');
    mediumPriority.id = 'mediumPriority';

    const mediumPriorityImage = document.createElement('img');
    mediumPriorityImage.id = 'mediumPriorityImage';

    appendMultipleNodesToParent(mediumPriorityLabel, mediumPriority, mediumPriorityImage);

    const highPriorityLabel = document.createElement('label');
    highPriorityLabel.setAttribute('for', 'highPriority');

    const highPriority = document.createElement('input');
    highPriority.setAttribute('type', 'radio');
    highPriority.setAttribute('name', 'priorityLevel');
    highPriority.setAttribute('value', 'high');
    highPriority.id = 'highPriority';

    const highPriorityImage = document.createElement('img');
    highPriorityImage.id = 'highPriorityImage';
    
    appendMultipleNodesToParent(highPriorityLabel, highPriority, highPriorityImage);

    // Append everything to a 'priorityDiv'
    const priorityDiv = document.createElement('div');
    priorityDiv.id = 'priorityDiv';
    appendMultipleNodesToParent(priorityDiv, lowPriorityLabel, mediumPriorityLabel, highPriorityLabel);
    
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

    const dueDateInput = document.createElement('input');
    dueDateInput.id = 'dueDateInput';
    dueDateInput.setAttribute('type', 'date');   
    dueDateInput.required = true;

    appendMultipleNodesToParent(dueDateField, dueDateLabel, dueDateInput);

    // Add Buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.id = 'buttonsDiv';
    form.appendChild(buttonsDiv);

    const addButton = document.createElement('button');
    addButton.id = 'addButton';
    addButton.innerText = 'Add';

    const cancelButton = document.createElement('button');
    cancelButton.addEventListener('click', closePopUp);
    cancelButton.id = 'cancelButton';
    cancelButton.innerText = 'Cancel';

    appendMultipleNodesToParent(buttonsDiv, addButton, cancelButton);
}

// PUBSUB - Functions to hide leftSidebar
const expandButton = 'expandButton';
const popUpClose = 'popUpClose';

// Expand Menu Clicked
const PubSubExpanderClicked = () => {
    let grid: Node = document.querySelector('#gridDiv');
    let stickyLeftDiv: Node = document.querySelector('#stickyLeftDiv');
    PubSub.publish(expandButton, [grid, stickyLeftDiv]);
}

const expandButtonListener = PubSub.subscribe(expandButton, function(expandButton, divsArray) {
    divsArray.forEach(div => {
        if (div.id === 'gridDiv') {
            div.classList.toggle('expandGrid')
        }
        else {
            div.classList.toggle('displayNone')
        }
    });
});

// Close PopUp Task Button Clicked
const closePopUp = () => {
    let popUpDiv = document.querySelector('#popUpDiv');
    PubSub.publish(popUpClose, popUpDiv);
}

const closePopUpListener = PubSub.subscribe(popUpClose, function(expandButton, popUpClose) {
    popUpClose.remove();
    showingPopUp = false;
});

return {
    generateNavBar: generateNavBar,
    generateGrid: generateGrid,
    populateLeftGrid: populateLeftGrid
}
})();