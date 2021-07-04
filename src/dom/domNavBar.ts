import { domForm } from "./domForm";
import { helperfunction } from "../helperFunctions";

// Navbar and LeftStickyNavBar DOM maniputalion is here
export const domNavBar = (() => {

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
        expander.addEventListener('click', function() {
            toggleLeftStickyNavBar();
        });
        expander.setAttribute('title', 'Projects');
        
        leftHeaderDiv.appendChild(expander);
        
        // Init right-li
        const addTodo = document.createElement('p');
        addTodo.innerText = '+';
        addTodo.classList.add('navOption');
        addTodo.setAttribute('title', 'Add Todo');
        addTodo.addEventListener('click', function() {
            domForm.todoPopUp();
        });
        
        const history = document.createElement('p');
        history.innerText = '\u{1F56E}';
        history.classList.add('navOption');
        history.setAttribute('title', 'History');

        
        helperfunction.appendMultipleNodesToParent(rightHeaderDiv, addTodo, history);
        
        }
        
    const toggleLeftStickyNavBar = () => {
        let grid = document.querySelector('#gridDiv');
        grid.classList.toggle('expandGrid');
        let stickyLeftDiv = document.querySelector('#stickyLeftDiv');
        stickyLeftDiv.classList.toggle('displayNone');
    }

    const closeLeftStickyNavBar = () => {
        let grid = document.querySelector('#gridDiv');
        grid.classList.add('expandGrid');
        let stickyLeftDiv = document.querySelector('#stickyLeftDiv');
        stickyLeftDiv.classList.add('displayNone');
    }

    return  {
        generateNavBar: generateNavBar,
        toggleLeftStickyNavBar: toggleLeftStickyNavBar,
        closeLeftStickyNavBar: closeLeftStickyNavBar,
    }

})();

