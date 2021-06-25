import { appendMultipleNodesToParent } from "./helperFunctions";

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

// // Init ul's
// const ulOptionsLeft = document.createElement('ul');
// ulOptionsLeft.id = 'ulOptionsLeft';
// leftHeaderDiv.appendChild(ulOptionsLeft);

// const ulOptionsRight = document.createElement('ul');
// rightHeaderDiv.appendChild(ulOptionsRight);
// ulOptionsRight.id = 'ulOptionsRight';

// Init left-li
const expander = document.createElement('p');
expander.innerText = '☰';
expander.classList.add('navOption');
leftHeaderDiv.appendChild(expander);

// Init right-li
const addTask = document.createElement('p');
addTask.innerText = '+';
addTask.classList.add('navOption')

const history = document.createElement('p');
history.innerText = '\u{1F56E}';
history.classList.add('navOption')

appendMultipleNodesToParent(rightHeaderDiv, addTask, history);

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

    const displayOptionsDiv = document.createElement('div');
    displayOptionsDiv.id = 'leftContainer';
    stickyLeftDiv.appendChild(displayOptionsDiv);

    const optionsList = document.createElement('ul');
    optionsList.id = 'optionsList'
    displayOptionsDiv.appendChild(optionsList);

    const today = document.createElement('li');
    today.id = 'today';
    today.innerText = 'Today'
    const thisWeek = document.createElement('li');
    thisWeek.id = 'thisWeek';
    thisWeek.innerText = 'This Week';
    const nextWeek = document.createElement('li');
    nextWeek.id = 'nextWeek';
    nextWeek.innerText = 'Next Week';
    appendMultipleNodesToParent(optionsList, today, thisWeek, nextWeek);
}

return {
    generateNavBar: generateNavBar,
    generateGrid: generateGrid,
    populateLeftGrid: populateLeftGrid
}
})();