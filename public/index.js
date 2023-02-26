import { 
  showTasks, 
  showTasksMenu, 
  showClientsMenu, 
  showSortMenu, 
  showSettingsMenu 
} from './accessDOM.js';

// show tasks
showTasks();

// get reference to toolbar buttons
const showTasksMenuBtn = document.querySelector('.tasks-btn');
const showSettingsMenuBtn = document.querySelector('.settings-btn');
const showClientsMenuBtn = document.querySelector('.clients-btn');
const showSortMenuBtn = document.querySelector('.sort-btn');

// add functions that toolbar buttons will run when clicked
showTasksMenuBtn.onclick = showTasksMenu;
showSettingsMenuBtn.onclick = showSettingsMenu;
showClientsMenuBtn.onclick = showClientsMenu;
showSortMenuBtn.onclick = showSortMenu;
