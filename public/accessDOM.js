import { getClientsFromServer, getTasksFromServer } from './accessServer.js';

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

  // nest elements and their contents
  task.appendChild(taskShadow);
  task.appendChild(taskBody);
  taskBody.appendChild(taskClient);
  taskBody.appendChild(taskDescription);
  taskBody.appendChild(taskCheckBox);
  taskBody.appendChild(taskLocation);
  taskClient.textContent = (clientData) ? clientData[taskData.client_id].name : null;
  taskClient.appendChild(taskMatter);
  taskMatter.textContent = " - " + taskData.matter;
  taskDescription.textContent = taskData.description; 
  taskLocation.appendChild(taskLocationIcon);
  taskLocation.appendChild(taskLocationText);
  taskLocationText.textContent = taskData.location;
  
  return task;
}

// turn tasks in dom elements and add them to the dom
export const addTasksToDom = (tasksContainer, tasks, clients) => {
  tasks.forEach(task => {
    const taskElement = createTaskElem(task, clients);
    tasksContainer.appendChild(taskElement);
  });
}

// remove tasks from dom
export const removeTasksFromDom = async (tasksContainer) => {
  tasksContainer.textContent = '';
}

// get tasks from server and add them to dom
export const showTasks = async () => {
  const tasksContainer = document.querySelector('.tasks');
  const tasks = await getTasksFromServer();
  const clients = await getClientsFromServer();

  if (tasks === null) {
    container.textContent = 'Tasks not found :(';
  } else {
    addTasksToDom(tasksContainer, tasks, clients);
  }
}

// show the different different menus
export const showClientsMenu = () => console.log('Clients button clicked');
export const showTasksMenu = () => console.log('Tasks button clicked');
export const showSortMenu = () => console.log('Sort button clicked');
export const showSettingsMenu = () => console.log('Settings button clicked');