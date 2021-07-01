import { Priority, Todo, Project } from "../types";
import { format } from 'date-fns'
import { projectModule } from "../project";
import { helperfunction } from "../helperFunctions";
import { domForm } from "./domForm";
import { domNavBar } from "./domNavBar";
import { pubSubModule } from "../pubSub/pubSub";

// Grid (left-side and right side) DOM maniputalion is here

export const domGrid = (() => {


    // Generates Grid in DOM
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

    // Left-Grid

    const populateToday = (event) => {
        console.log('later');
        // let todayDate = new Date;
        // let todayString: string = format(todayDate , 'PP');
        // let todosToShow: Todo[];
        
        // let allProjects = projectModule.listofProjects;
    
        // allProjects.forEach(project => {
        //     project.children.forEach(todo => {
        //         if (format(todo.dueDate, 'PP') === todayString) {
        //             todosToShow.push(todo);
        //         }
        //     });
        // });
        
    }
    
    const populateTomorrow = () => {
        console.log('later');
    }
    
    const populateWeek = () => {
        console.log('later');
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
        today.innerText = 'Today';
        today.addEventListener('click', populateToday);
        const tomorrow = document.createElement('li');
        tomorrow.id = 'tomorrow';
        tomorrow.innerText = 'Tomorrow';
        tomorrow.addEventListener('click', populateTomorrow);
        const week = document.createElement('li');
        week.id = 'week';
        week.innerText = 'Week';
        week.addEventListener('click', populateWeek);
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

        populateSideBarProjectsList();

        const addProject = document.createElement('p');
        addProject.id = 'addProject';
        addProject.innerHTML = "<span id = 'plus'>+</span> New Project"
        addProject.addEventListener('click', domForm.projectPopUp);
        listOfProjectsDiv.appendChild(addProject);
    }

    // Populates left-Grid with all projects in listOfProjects
    const populateSideBarProjectsList = () => {
        let projectUnorderedList = document.querySelector('#projectUnorderedList');
        
        const projectsArray = projectModule.listofProjects;

        projectsArray.forEach(project => {
            let ProjectToBeListed = document.createElement('li');
            ProjectToBeListed.classList.add('project')
            ProjectToBeListed.addEventListener('click', function(event) {
                domGrid.populateRightGrid(event, undefined, true);
                domNavBar.toggleLeftStickyNavBar();
            });
            ProjectToBeListed.innerText = project.title;
            projectUnorderedList.appendChild(ProjectToBeListed);
        });
    }
        // Removes previous unordered list of projects in left-grid and update them.
    const updateSideBarProjects = () => {
        let nodeToRemove = document.querySelector('#projectUnorderedList');
        helperfunction.removeChildNodes(nodeToRemove);

        populateSideBarProjectsList();
    }

    // Right-Grid

    // Populates Right-Grid
    const populateRightGrid = (event?, titleOfProject?:string, clearPrevious?: boolean) => {
        const stickyRightDiv = document.querySelector('#stickyRightDiv');

        // Remove previous Nodes on stickyRightDiv
        if (clearPrevious) {
            helperfunction.removeChildNodes(stickyRightDiv);
        }

        // Create Div where elements will be appended
        const projectAndTodosDiv = document.createElement('div');
        projectAndTodosDiv.id = 'projectAndTodosDiv';
        stickyRightDiv.appendChild(projectAndTodosDiv);
        
        // Identify requested Project
        let projectTitle;
        if (event !== undefined) {
            projectTitle = event.target.innerText;
        }
        else if (titleOfProject) {
            projectTitle = titleOfProject;
        }

        let chosenProject: Project = projectModule.findProject(projectTitle);   

        // Create Header with chosenProject.title
        let projectHeader = document.createElement('p');
        projectHeader.innerText = chosenProject.title;
        projectHeader.id = 'projectHeader';
        projectAndTodosDiv.appendChild(projectHeader);

        // Label The Todo's that will be appended
        let tableDiv = document.createElement('div');
        tableDiv.id = 'tableDiv';
        projectAndTodosDiv.appendChild(tableDiv);

        const table = document.createElement('table');
        tableDiv.appendChild(table);
        const thead = document.createElement('thead');
        table.appendChild(thead);
        let trForLabel = document.createElement('tr');
        thead.appendChild(trForLabel);

        let statusLabel = document.createElement('th');
        statusLabel.innerText = 'Status';

        let titleLabel = document.createElement('th');
        titleLabel.innerText = 'Title';

        let dateLabel = document.createElement('th');
        dateLabel.innerText = 'Due Date';

        let priorityLabel = document.createElement('th');
        priorityLabel.innerText = 'Priority';

        helperfunction.appendMultipleNodesToParent(trForLabel, statusLabel, titleLabel, dateLabel, priorityLabel);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        // Loop through Project's children Todo's
        let projectChildren = chosenProject.children
        projectChildren.forEach(todo => {
            let tableRow = document.createElement('tr');

            let completed: boolean = todo.completed
            let checkBoxTd = document.createElement('td');
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkBoxTd.appendChild(checkbox);
            

            let title: string = todo.title;
            let titleTd = document.createElement('td');
            titleTd.innerText = title

            let dueDate: string = format(todo.dueDate , 'PP');
            let dueDateTd = document.createElement('td');
            dueDateTd.innerText = dueDate

            let priority: string = todo.priority;
            let priorityTd = document.createElement('td');
            let priorityImg = document.createElement('img');
            priorityTd.appendChild(priorityImg);
            if (priority === 'low') {
                priorityImg.classList.add('lowPriority')
            }
            else if (priority === 'medium') {
                priorityImg.classList.add('mediumPriority');
            }
            else if (priority === 'high') {
                priorityImg.classList.add('highPriority');
            }

            helperfunction.appendMultipleNodesToParent(tableRow, checkBoxTd, titleTd, dueDateTd, priorityTd);
            tbody.appendChild(tableRow);
        });
    }   
    
    return  {
        generateGrid: generateGrid,
        populateLeftGrid: populateLeftGrid,
        populateSideBarProjectsList: populateSideBarProjectsList,
        updateSideBarProjects: updateSideBarProjects,
        populateRightGrid: populateRightGrid
    }
    
    })();
    
    