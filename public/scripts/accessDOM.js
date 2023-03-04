import { getClientsFromServer, getTasksFromServer } from './accessServer.js';

/* ====================
         TASKS
   ==================== */

// turn tasks into dom elements
export const createTaskElem = (taskData, clientData) => {
  // create elements
  const task = document.createElement('div');
  const taskBody = document.createElement('div');
  const taskShadow = document.createElement('div');
  const taskClient = document.createElement('p');
  const taskMatter = document.createElement('span');
  const taskDescription = document.createElement('p');
  const taskCheckBox = document.createElement('div');
  const taskLocation = document.createElement('p');
  const taskLocationIcon = document.createElement('i');
  const taskLocationText = document.createElement('span');

  // add classes to elements
  task.classList.add('task');
  taskBody.classList.add('task__body', 'clickable');
  taskClient.classList.add('task__client');
  taskMatter.classList.add('task__matter');
  taskDescription.classList.add('task__description');
  taskCheckBox.classList.add('task__checkbox');
  taskLocation.classList.add('task__location');
  taskLocationIcon.classList.add('fa-solid', 'fa-location-dot');
  taskLocationText.classList.add('task__location__text');
  taskShadow.classList.add('task__shadow');

  // nest elements and add their contents
  task.appendChild(taskShadow);
  task.appendChild(taskBody);
  taskBody.appendChild(taskClient);
  taskBody.appendChild(taskDescription);
  taskBody.appendChild(taskCheckBox);
  taskBody.appendChild(taskLocation);
  taskClient.textContent = (clientData) ? clientData[taskData.client_id].name : 'null';
  taskClient.appendChild(taskMatter);
  taskMatter.textContent = " - " + taskData.matter;
  taskDescription.textContent = taskData.description; 
  taskLocation.appendChild(taskLocationIcon);
  taskLocation.appendChild(taskLocationText);
  taskLocationText.textContent = taskData.location;
  
  return task;
}

// turn tasks in dom elements and add them to the dom
export const addTasksToDom = (tasksContainer, { tasks, clients} ) => {
  tasks.forEach(task => {
    const taskElement = createTaskElem(task, clients);
    tasksContainer.appendChild(taskElement);
  });
}

// remove tasks from dom
export const removeTasksFromDom = async (tasksContainer) => {
  tasksContainer.textContent = '';
}

// add relevant errors to task list in dom
const addErrorsToTaskList = (container, { tasks, clients }) => {
  if (tasks === null) {
    const tasksError = document.createElement('p');
    tasksError.classList.add('tasks__error');
    tasksError.textContent = 'Tasks not found.';
    container.appendChild(tasksError);
  }

  if (clients === null) {
    const clientsError = document.createElement('p');
    clientsError.classList.add('tasks__error');
    clientsError.textContent = 'Clients not found.';
    container.appendChild(clientsError);
  }
}

// get tasks from server and add them to dom
export const showTasks = async () => {
  const tasksContainer = document.querySelector('.tasks');
  const tasks = await getTasksFromServer();
  const clients = await getClientsFromServer();

  if (!tasks || !clients) {
    addErrorsToTaskList(tasksContainer, { tasks, clients });
  } else {
    addTasksToDom(tasksContainer, { tasks, clients });
  }
}

/* ====================
      HANDLE TOOLBAR
   ==================== */

const isToolbarBtnActive = (btn) => btn.dataset.active === 'true';
const markToolbarBtnActive = (btn) => btn.dataset.active = 'true';
const markToolbarBtnInactive = (btn) => btn.dataset.active = 'false';

const getClickedToolbarBtn = (target) => {
  if (target.classList.contains('toolbar__btn')) return target;
  else if (target.tagName.toLowerCase() === 'body') return target;
  else return getClickedToolbarBtn(target.parentNode);
}

// mark toolbar btn as active and deactivate the rest
const handleActiveToolbarBtn = (clickedBtn) => {
  const toolbarBtns = [...document.querySelector('.toolbar').children];
  toolbarBtns.forEach(btn => {
    if (clickedBtn === btn) {
      markToolbarBtnActive(btn);
    } else if (isToolbarBtnActive(btn)) {
      markToolbarBtnInactive(btn);
    }
  });
}

/* ====================
      HANDLE MENUS
   ==================== */

const isMenuActive = (menu) => menu.dataset.active === 'true';
const markMenuActive = (menu) => menu.dataset.active = 'true';
const markMenuInactive = (menu) => menu.dataset.active = 'false';

const showMenu = (activatedMenu, menus) => {
  menus.forEach(menu => {
    if (menu === activatedMenu) {
      markMenuActive(menu);
    } else if (isMenuActive(menu)) {
      markMenuInactive(menu);
    }
  })
}

// apply styles to clicked button and show correct menu
export const handleToolbarBtnClick = (e) => {
  const clickedBtn = getClickedToolbarBtn(e.target);
  handleActiveToolbarBtn(clickedBtn);
  const linkedMenuClass = clickedBtn.dataset.linkedMenuClass;
  const linkedMenu = document.querySelector(linkedMenuClass);
  const menus = [...document.querySelectorAll('.menu')];
  showMenu(linkedMenu, menus);
}