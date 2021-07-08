import { format } from 'date-fns'
import { projectModule, listOfProjects, Project} from "../project";
import { Todo, todoModule, completedTodosList } from "../todo";
import { helperfunction } from "../helperFunctions";
import { domForm } from "./domForm";
import { domNavBar } from "./domNavBar";



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
    
    // Populates Left-Grid 
    const populateLeftGrid = () => {
        let stickyLeftDiv = document.querySelector('#stickyLeftDiv');
        const todayTomorrowWeekDiv = document.createElement('div');
        todayTomorrowWeekDiv.id = 'todayTomorrowWeekDiv';
        stickyLeftDiv.appendChild(todayTomorrowWeekDiv);
    
        const optionsList = document.createElement('ul');
        optionsList.id = 'optionsList'
        todayTomorrowWeekDiv.appendChild(optionsList);
    
        // populate day options with Today, Tomorrow and Week
        const today = document.createElement('li');
        today.id = 'today';
        today.innerText = 'Today';
        today.addEventListener('click', function(event) {
            populateRightGridByDueDate(event);
        });
        const tomorrow = document.createElement('li');
        tomorrow.id = 'tomorrow';
        tomorrow.innerText = 'Tomorrow';
        tomorrow.addEventListener('click', function(event) {
            populateRightGridByDueDate(event);
        });
        const week = document.createElement('li');
        week.id = 'week';
        week.innerText = 'Week';
        week.addEventListener('click', function(event) {
            populateRightGridByDueDate(event);
        });
        helperfunction.appendMultipleNodesToParent(optionsList, today, tomorrow, week);
    
        // Init displayProjectsDiv - This is the div where projects will be displayed
        const projectDiv = document.createElement('div');
        projectDiv.id = 'projectDiv';
        stickyLeftDiv.appendChild(projectDiv);
    
        // Gives innerText Projects to the Div with and arrow pointing down
        const projects = document.createElement('p');
        projects.id = 'projects';
        projects.innerText = 'Projects'
        const expandProjectsArrow = document.createElement('p');
        expandProjectsArrow.id = 'expandProjectsArrow';
        expandProjectsArrow.innerText = '\u{02C5}';
        helperfunction.appendMultipleNodesToParent(projectDiv, projects, expandProjectsArrow);
    
        // Init listOfProjectsDiv where an unordered list of projects will be appended
        const listOfProjectsDiv = document.createElement('div');
        listOfProjectsDiv.id = 'listOfProjectsDiv';
        stickyLeftDiv.appendChild(listOfProjectsDiv);
    
        const projectUnorderedList = document.createElement('ul');
        projectUnorderedList.id = 'projectUnorderedList'
        listOfProjectsDiv.appendChild(projectUnorderedList);
    
        // populates side bar with all the projects
        populateSideBarProjectsList();
        
        // Add button that user can click to add a new project
        const addProject = document.createElement('p');
        addProject.id = 'addProject';
        addProject.innerHTML = "<span id = 'plus'>+</span> New Project"
        addProject.addEventListener('click', domForm.projectPopUp);
        listOfProjectsDiv.appendChild(addProject);
    }

    // Populates left-Grid with all projects in listOfProjects
    const populateSideBarProjectsList = () => {
        let projectUnorderedList = document.querySelector('#projectUnorderedList');
        
        const projectsArray = listOfProjects;

        // loops through projects array and populate it alol projects
        projectsArray.forEach(project => {
            let ProjectToBeListed = document.createElement('li');
            ProjectToBeListed.classList.add('project')
            ProjectToBeListed.addEventListener('click', function(event) {
                domGrid.populateRightGrid(event, undefined);
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

    // Populates Right-Grid
    const populateRightGrid = (event?, titleOfProject?:string) => {
       
        const stickyRightDiv = document.querySelector('#stickyRightDiv');

        // Remove childNodes of stickyRightDiv
        helperfunction.removeChildNodes(stickyRightDiv);
        
        // Identify requested Project
        let projectTitle;

        // if an event triggered the function, use innerText as projectTitle
        if (event !== undefined) {
            projectTitle = event.target.innerText;
        }
        // else if it was passed as an argument directly
        else if (titleOfProject) {
            projectTitle = titleOfProject;
        }

        // find project we want to populate the rightDiv with
        let chosenProject: Project = projectModule.getProjectByTitle(projectTitle);  
        
        // get children ( todo [] ) of Project
        let projectChildren = chosenProject.children

        // use children( todos ) to populate table
        populateTableWithTodoArray(projectChildren, stickyRightDiv, projectTitle);

    }   
    
    //  Populates Right-Grid Based on Todo's dueDate: today, tomorrow, week
    const populateRightGridByDueDate = (event) => {
        
        let header:string = event.target.innerText;
        
        // Get Today's date
        let date = new Date;
        
        // Init weekDate
        let weekDate = new Date;
        
        // Init array that will populate Table
        let todosThatWillPopulateTable: Todo[] = [];

        switch (header) {
            case 'Today':
                todosThatWillPopulateTable = todoModule.generateArrayOfTodosBasedOnDate(date);
                break;
            case 'Tomorrow':
                date.setDate(date.getDate() + 1);
                todosThatWillPopulateTable = todoModule.generateArrayOfTodosBasedOnDate(date);
                break;
            case 'Week':
                weekDate.setDate(weekDate.getDate() + 7);
                todosThatWillPopulateTable = todoModule.generateArrayOfTodosBasedOnDate(date, weekDate);
                break;
            default:
                break;
        }

        const stickyRightDiv = document.querySelector('#stickyRightDiv');

        // Remove childNodes of stickyRightDiv
        helperfunction.removeChildNodes(stickyRightDiv);

        // Populate Table with Todos based on dueDate - today. tomorrow or week
        populateTableWithTodoArray(todosThatWillPopulateTable, stickyRightDiv, header);

        // Close sidebar
        domNavBar.toggleLeftStickyNavBar();
    }   
    
    // Populate Tables
    const populateTableWithTodoArray = (arrayOfTodos: Todo[], stickyRightDiv: Node, headerOfTable?: string) => {

        // Init div where everything else will be appended
        const projectAndTodosDiv = document.createElement('div');
        projectAndTodosDiv.id = 'projectAndTodosDiv';
        stickyRightDiv.appendChild(projectAndTodosDiv);

        // Create Header with chosenProject.title
        let projectOrDayHeader = document.createElement('p');
        projectOrDayHeader.innerText = headerOfTable;
        projectOrDayHeader.id = 'projectHeader';
        projectAndTodosDiv.appendChild(projectOrDayHeader);

        // If user is viewing a Project, give option to edit or delete project
        if(headerOfTable !== 'History' && headerOfTable !== 'Today'
        && headerOfTable !== 'Tomorrow' && headerOfTable !== 'Week') {
            let editAndDeleteProjectDiv = document.createElement('div');
            editAndDeleteProjectDiv.id = 'editAndDeleteProjectDiv';

            // add 'Edit Project' button 
            let editProject = document.createElement('p');
            editProject.innerText = 'Edit Project';
            editProject.id = 'editProject';
            editProject.setAttribute('data-project', `${headerOfTable}`);
            editProject.setAttribute('data-type', 'edit');
            editProject.addEventListener('click', function(event) {
                domForm.projectPopUp(event);
            });

            // Add 'Delete Project' button
            let deleteProject = document.createElement('p');
            deleteProject.innerText = 'Delete Project';
            deleteProject.id = 'deleteProject';
            deleteProject.setAttribute('data-project', `${headerOfTable}`);
            deleteProject.addEventListener('click', function() {
                projectModule.deleteProject(headerOfTable);
            });
            helperfunction.appendMultipleNodesToParent(editAndDeleteProjectDiv, editProject, deleteProject);
            projectAndTodosDiv.appendChild(editAndDeleteProjectDiv);
        }

        // If array is empty. do not display a table
        if(arrayOfTodos.length === 0) {
            let sorryDiv = document.createElement('div');
            projectAndTodosDiv.appendChild(sorryDiv);
            let pElement = document.createElement('p');
            pElement.innerText = 'Nothing to show...';
            sorryDiv.appendChild(pElement);
        }

        // if array has any elements, display table
        else {
            
            // give option to clear list of completed Todos
            if (headerOfTable === 'History') {
                let clearListP = document.createElement('p');
                clearListP.innerText = 'Clear Whole List';
                clearListP.id = 'clearCompletedTodosList';
                projectAndTodosDiv.appendChild(clearListP);
                clearListP.addEventListener('click', function() {
                    // clear list
                    todoModule.clearCompletedTodosList();

                    // remove table
                    helperfunction.removeChildNodes(stickyRightDiv);

                    // update table (in this case, empty one)
                    populateTableWithTodoArray(arrayOfTodos, stickyRightDiv, headerOfTable);
                });
            }

            // Init div where table will be appended
            let tableDiv = document.createElement('div');
            tableDiv.id = 'tableDiv';
            projectAndTodosDiv.appendChild(tableDiv);

            // Init table and append to tableDiv. Init table head and append to table
            const table = document.createElement('table');
            tableDiv.appendChild(table);
            const thead = document.createElement('thead');
            table.appendChild(thead);
            let trForLabel = document.createElement('tr');
            thead.appendChild(trForLabel);

            // Label the table
            let statusLabel = document.createElement('th');
            statusLabel.innerText = 'Status';

            let titleLabel = document.createElement('th');
            titleLabel.innerText = 'Title';

            let dateLabel = document.createElement('th');
            dateLabel.innerText = 'Due Date';

            let priorityLabel = document.createElement('th');
            priorityLabel.innerText = 'Priority';

            helperfunction.appendMultipleNodesToParent(trForLabel, statusLabel, titleLabel, dateLabel, priorityLabel);

            // append table body to table
            const tbody = document.createElement('tbody');
            table.appendChild(tbody);

            // check if todo.dueDate is of type string, if so, convert it to Date type (localStorage saves Date as strings)
            arrayOfTodos = todoModule.convertTodoStringDatesIntoDates(arrayOfTodos);

            // Sort Array by closest dueDate to farthest
            arrayOfTodos.sort((a,b)=>a.dueDate.getTime()- b.dueDate.getTime());
            
            // Init TodoCount which helpes identify which div to expand when user clicks expandArrow
            let todoCount = 0;

            arrayOfTodos.forEach(todo => {

                // create table row for todo
                let tableRow = document.createElement('tr');
                tableRow.id = `data-row${todoCount}`;

                let checkOrDeleteTd = document.createElement('td');
                checkOrDeleteTd.id = 'checkOrDeleteTd';


                let checkAsComplete = document.createElement('p');
                checkAsComplete.setAttribute('data-targetrow', `${todoCount}`);

                let completed: boolean = todo.completed
                checkOrDeleteTd.appendChild(checkAsComplete);

                if (completed) {
                    checkAsComplete.innerText = 'Completed';
                }
                else {
                    checkAsComplete.innerText = '\u{2713}'
                    checkAsComplete.classList.add('checkTodo');
                    checkAsComplete.setAttribute('title', 'Click to mark as completed.')
                    checkAsComplete.addEventListener('click', function(event) {
                        todoModule.markTodoAsCompleted(todo, event);  
                    });
                }

                // Set Todo title, dueDate, priority that display in table
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

                // create expand arrow td
                let detailsTd = document.createElement('td');
                detailsTd.innerText = '\u{02C5}';
                detailsTd.classList.add('detailsExpandArrow');

                // Idenfify the expand arrow with a unique number
                detailsTd.id = `${todoCount}`;

                // When user clicks an expand arrow
                detailsTd.addEventListener('click', function(e:any) {

                    // Identifies which arrow was clicked
                    let arrowClicked:string = e.target.id;

                    // expand Todo that was clicked on
                    let targetTableRow = document.querySelector(`#expanded${arrowClicked}`);
                    targetTableRow.classList.toggle('showDetails');

                    // if any other Todo is expanded close it
                    let allExpandedTodos = document.querySelectorAll('.expandedTodo');
                    allExpandedTodos.forEach(expandedTodo => {
                        if (expandedTodo.id !== `expanded${arrowClicked}`) {
                        expandedTodo.classList.remove('showDetails');
                        }
                    });
                    
                });

                helperfunction.appendMultipleNodesToParent(tableRow, checkOrDeleteTd, titleTd, dueDateTd, priorityTd, detailsTd);

                tbody.appendChild(tableRow);

                // create table row that gives more details: description, parentProject and option to edit/delete Todos
                let expandedTodo = document.createElement('tr');
                expandedTodo.classList.add('expandedTodo');
                expandedTodo.id = `expanded${todoCount}`;

                let singleCell = document.createElement('td');
                singleCell.classList.add('expandedCell');
                singleCell.setAttribute('colspan', '4');
                singleCell.setAttribute('data-project', todo.parentProject);
                singleCell.setAttribute('data-todotitle', todo.title);

                let divInsideCell = document.createElement('div');
                singleCell.appendChild(divInsideCell);

                let description = document.createElement('p');
                description.classList.add('todoDescription');

                if(todo.description === "") {
                    description.innerHTML = '<strong>Description</strong>: No description given... ';
                }

                else {
                    description.innerHTML = '<strong>Description</strong>: ' + todo.description;
                }

                let parentProject = document.createElement('p');
                parentProject.innerHTML= '<strong>Project</strong>: ' + todo.parentProject;
                parentProject.classList.add('parentProject');

                if(!completed) {
                    let edit = document.createElement('p');
                    edit.innerText= 'Edit';
                    edit.classList.add('edit');
                    edit.addEventListener('click', function(event:any) {
                        let project = event.target.offsetParent.dataset.project;
                        let title = event.target.offsetParent.dataset.todotitle;
                        todoModule.editTodo(project, title);
                    });
                    divInsideCell.appendChild(edit);
                }

                let deleteTodo = document.createElement('p');
                deleteTodo.innerText = 'Delete';
                deleteTodo.classList.add('deleteTodo');
                deleteTodo.setAttribute('data-targetrow', `${todoCount}`);
                deleteTodo.addEventListener('click', function(event:any) {

                    // Get title and parentProject of Todo user asked to delete
                    let todoTitle = event.target.offsetParent.dataset.todotitle;
                    let parentProjectTitle = event.target.offsetParent.dataset.project;

                    // Delete Todo - if completed = false => delete from project. Else delete from completedTodosList
                    todoModule.deleteTodo(todoTitle, parentProjectTitle, event, todo.completed);
                });

                // increment Todo count
                todoCount++;


                helperfunction.appendMultipleNodesToParent(divInsideCell, description, parentProject, deleteTodo);
                helperfunction.appendMultipleNodesToParent(expandedTodo, singleCell);

                helperfunction.insertAfter(expandedTodo, tableRow);

            });
        }
    }

    // Populates Todo History Table ONLY
    const populateHistoryTable = () => {
        let stickyRightDiv = document.querySelector('#stickyRightDiv');
            helperfunction.removeChildNodes(stickyRightDiv);
            domGrid.populateTableWithTodoArray(completedTodosList, stickyRightDiv, 'History');
    }

    return  {
        generateGrid: generateGrid,
        populateLeftGrid: populateLeftGrid,
        populateSideBarProjectsList: populateSideBarProjectsList,
        populateTableWithTodoArray: populateTableWithTodoArray,
        updateSideBarProjects: updateSideBarProjects,
        populateRightGrid: populateRightGrid,
        populateHistoryTable: populateHistoryTable
    }
    
    })();
    
    