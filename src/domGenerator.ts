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

// Init ul's
const ulOptionsLeft = document.createElement('ul');
ulOptionsLeft.id = 'ulOptionsLeft';
leftHeaderDiv.appendChild(ulOptionsLeft);

const ulOptionsRight = document.createElement('ul');
rightHeaderDiv.appendChild(ulOptionsRight);
ulOptionsRight.id = 'ulOptionsRight';

// Init left-li
const expander = document.createElement('li');
expander.innerText = '☰';
expander.classList.add('navOption');
ulOptionsLeft.appendChild(expander);

// Init right-li
const addTask = document.createElement('li');
addTask.innerText = '+';
addTask.classList.add('navOption')

const history = document.createElement('li');
history.innerText = '⧗';
history.classList.add('navOption')

appendMultipleNodesToParent(ulOptionsRight, addTask, history);

}
return {
    generateHeader: generateNavBar
}
})();