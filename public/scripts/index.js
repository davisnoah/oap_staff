import { 
  showTasks, 
  showTasksMenu, 
  showClientsMenu, 
  showFilterMenu, 
  showSettingsMenu 
} from './accessDOM.js';

document.addEventListener('DOMContentLoaded', (event) => {
  // show tasks
  showTasks();

  // get reference to toolbar buttons
  const tasksMenuBtn = document.querySelector('.tasks-btn');
  const settingsMenuBtn = document.querySelector('.settings-btn');
  const clientsMenuBtn = document.querySelector('.clients-btn');
  const filterMenuBtn = document.querySelector('.filter-btn');

  // add functions that toolbar buttons will call when clicked
  tasksMenuBtn.onclick = showTasksMenu;
  settingsMenuBtn.onclick = showSettingsMenu;
  clientsMenuBtn.onclick = showClientsMenu;
  filterMenuBtn.onclick = showFilterMenu;

});
