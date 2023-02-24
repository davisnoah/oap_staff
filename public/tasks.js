import { getClientsFromServer } from './clients.js'

// get tasks array from server
export const getTasksFromServer = async () => {
  let response;
  try {
    response = await fetch('http://localhost:8080/tasks', {
      method: 'get',
    });
  } catch(error) {
    return null;
  }

  return await response.json();
}

// turn tasks in dom elements and add them to the dom
export const addTasksToDom = (tasksContainer, tasks, clients) => {
  tasks.forEach(task => {
    const taskElement = createTaskDomElem(task, clients);
    tasksContainer.appendChild(taskElement);
  });
}

// turn tasks into dom elements
export const createTaskDomElem = (taskData, clientData) => {
  // create elements
  const task = document.createElement('div');
  const taskBody = document.createElement('div');
  const taskShadow = document.createElement('div');
  const taskClient = document.createElement('p');
  const taskDescription = document.createElement('p');
  const taskCheckBox = document.createElement('div');
  const taskLocation = document.createElement('p');
  const taskLocationIcon = document.createElement('i');
  const taskLocationText = document.createElement('span');

  // add classes to elements
  task.classList.add('task');
  taskBody.classList.add('task__body');
  taskClient.classList.add('task__client');
  taskDescription.classList.add('task__description');
  taskCheckBox.classList.add('task__checkbox');
  taskLocation.classList.add('task__location');
  taskLocationIcon.classList.add('fa-solid', 'fa-location-dot');
  taskShadow.classList.add('task__shadow');

  // nest elements and their contents
  task.appendChild(taskShadow);
  task.appendChild(taskBody);
  taskBody.appendChild(taskClient);
  taskBody.appendChild(taskDescription);
  taskBody.appendChild(taskCheckBox);
  taskBody.appendChild(taskLocation);
  taskClient.textContent = clientData[taskData.client_id].name;
  taskDescription.textContent = taskData.description; 
  taskLocation.appendChild(taskLocationIcon);
  taskLocation.appendChild(taskLocationText);
  taskLocationText.textContent = " " + taskData.location;
  
  return task;
}

// remove tasks from dom
export const removeTasksFromDom = async (tasksContainer) => {
  tasksContainer.textContent = '';
}

// get tasks from server and add them to dom
export const showTasks = async (container) => {
  // get tasks from server
  const tasks = await getTasksFromServer();
  
  // get clients from server
  const clients = await getClientsFromServer();

  if (tasks === null) {
    // show error message
    container.textContent = 'Tasks not found :(';
  } else {
    // show tasks
    addTasksToDom(container, tasks, clients);
  }
}