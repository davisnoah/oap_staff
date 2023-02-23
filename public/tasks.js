/* 
  DOM ELEMENTS
*/

const tasksContainer = document.querySelector('.tasks-container');

/*
  FUNCTIONS
*/
const getTasks = async () => {
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

const showTasks = async (container) => {
  // gets tasks
  const tasks = await getTasks();

  if (tasks === null) {
    // show error message
    container.textContent = 'Tasks not found :(';
  } else {
    // show tasks
    tasks.forEach(task => {
      const taskElement = createTaskElement(task);
      tasksContainer.appendChild(taskElement);
    })
  }
}

const hideTasks = async (container) => {
  container.textContent = '';
}

const createTaskElement = (taskData) => {
  const task = document.createElement('div');
  const taskBody = document.createElement('div');
  const taskShadow = document.createElement('div');
  const taskDescription = document.createElement('div');
  task.classList.add('task');
  taskBody.classList.add('task__body');
  taskBody.classList.add('flex--column');
  taskDescription.classList.add('task__description')
  taskShadow.classList.add('task__shadow');
  task.appendChild(taskShadow);
  task.appendChild(taskBody);
  taskBody.appendChild(taskDescription);
  taskDescription.textContent = JSON.stringify(taskData);
  
  return task;
}

/* 
  INITIAL FUNCTION CALLS
*/

showTasks(tasksContainer);