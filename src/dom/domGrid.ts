import { Priority, Todo, Project } from "../types";
import { format } from 'date-fns'
import { projectModule } from "../project";
import { helperfunction } from "../helperFunctions";
import { domForm } from "./domForm";
import { domNavBar } from "./domNavBar";
import * as moment from "moment";


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

    //  Populates Right-Grid Based on dueDate
    const showTodosByDueDate = (event) => {
        
        let header:string = event.target.innerText;
        
        // Get Today's date
        let date = new Date;

        // Init weekDate
        let weekDate = new Date;

        // Init array
        let todosThatWillPopulateTable: Todo[];

        switch (header) {
            case 'Today':
                todosThatWillPopulateTable = generateArrayOfTodosThatPopulateTable(date);
                break;
            case 'Tomorrow':
                date.setDate(date.getDate() + 1);
                todosThatWillPopulateTable = generateArrayOfTodosThatPopulateTable(date);
                break;
            case 'Week':
                weekDate.setDate(weekDate.getDate() + 7);
                todosThatWillPopulateTable = generateArrayOfTodosThatPopulateTable(date, weekDate);
                break;
            default:
                break;
        }

        // Sort Array by closest dueDate to farthest
        todosThatWillPopulateTable.sort((a,b)=>a.dueDate.getTime()- b.dueDate.getTime());


        const stickyRightDiv = document.querySelector('#stickyRightDiv');

        // Remove previouly attached nodes
        helperfunction.removeChildNodes(stickyRightDiv);

        // Close sidebar
        domNavBar.toggleLeftStickyNavBar();

        // Create Div where elements will be appended
        const projectAndTodosDiv = document.createElement('div');
        projectAndTodosDiv.id = 'projectAndTodosDiv';
        stickyRightDiv.appendChild(projectAndTodosDiv);

        // Create Header with chosenProject.title
        let dayHeader = document.createElement('p');
        dayHeader.innerText = header;
        dayHeader.id = 'projectHeader';
        projectAndTodosDiv.appendChild(dayHeader);

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

        // Loop through todosToshow
        todosThatWillPopulateTable.forEach(todo => {
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

    const generateArrayOfTodosThatPopulateTable = (date: Date, weekDate?: Date) => {
        let todosThatWillPopulateTableArray: Todo[] = [];

        if (!weekDate) {
            projectModule.listofProjects.forEach(project => {
                project.children.forEach(todo => {
                    if(format(todo.dueDate, 'PP') === format(date, 'PP')) {
                        todosThatWillPopulateTableArray.push(todo);
                    }
                });
            });
        }
        else {
            console.log(weekDate);
            projectModule.listofProjects.forEach(project => {
                project.children.forEach(todo => {
                    let formattedTodoDate = moment(todo.dueDate).format('YYYY-MM-DD');
                    let formattedDate = moment(date).format('YYYY-MM-DD');
                    let formattedWeekDate = moment(weekDate).format('YYYY-MM-DD');
                    console.log({formattedTodoDate, formattedDate, formattedWeekDate});
                    if(moment(formattedTodoDate).isBetween(formattedDate, formattedWeekDate, undefined, '[]')) {
                        todosThatWillPopulateTableArray.push(todo);
                    }
                }); 
            });
        }
        return todosThatWillPopulateTableArray
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
        today.addEventListener('click', function(event) {
            showTodosByDueDate(event);
        });
        const tomorrow = document.createElement('li');
        tomorrow.id = 'tomorrow';
        tomorrow.innerText = 'Tomorrow';
        tomorrow.addEventListener('click', function(event) {
            showTodosByDueDate(event);
        });
        const week = document.createElement('li');
        week.id = 'week';
        week.innerText = 'Week';
        week.addEventListener('click', function(event) {
            showTodosByDueDate(event);
        });
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

        // Sort Array by closest dueDate to farthest
        projectChildren.sort((a,b)=>a.dueDate.getTime()- b.dueDate.getTime());
        
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
    
    