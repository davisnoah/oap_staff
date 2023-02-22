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
    container.textContent = JSON.stringify(tasks);
  }
}

const hideTasks = async (container) => {
  container.textContent = '';
}

/* 
  STARTING FUNCTION CALLS
*/

showTasks(tasksContainer);