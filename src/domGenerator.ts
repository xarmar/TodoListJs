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

return {
    generateNavBar: generateNavBar,
    generateGrid: generateGrid,
    populateLeftGrid: populateLeftGrid
}
})();