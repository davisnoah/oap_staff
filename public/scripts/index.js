import { 
  showTasks,
  handleToolbarBtnClick
} from './accessDOM.js';

document.addEventListener('DOMContentLoaded', (event) => {
  // show tasks
  showTasks();

  // get menus
  const tasksMenu = document.querySelector('.tasks-menu');
  const clientsMenu = document.querySelector('.clients-menu');
  const filterMenu = document.querySelector('.filter-menu');
  const settingsMenu = document.querySelector('.settings-menu');

  // hide all menus
  tasksMenu.dataset.active = 'false';
  clientsMenu.dataset.active = 'false';
  filterMenu.dataset.active = 'false';
  settingsMenu.dataset.active = 'false';

  // get toolbar buttons
  const tasksMenuBtn = document.querySelector('.tasks-btn');
  const clientsMenuBtn = document.querySelector('.clients-btn');
  const filterMenuBtn = document.querySelector('.filter-btn');
  const settingsMenuBtn = document.querySelector('.settings-btn');
  
  // link menus to toolbar buttons
  tasksMenuBtn.dataset.linkedMenuClass = '.tasks-menu';
  clientsMenuBtn.dataset.linkedMenuClass = '.clients-menu';
  filterMenuBtn.dataset.linkedMenuClass = '.filter-menu';
  settingsMenuBtn.dataset.linkedMenuClass = '.settings-menu';

  // add function to call when toolbar buttons are clicked
  tasksMenuBtn.onclick = handleToolbarBtnClick;
  clientsMenuBtn.onclick = handleToolbarBtnClick;
  filterMenuBtn.onclick = handleToolbarBtnClick;
  settingsMenuBtn.onclick = handleToolbarBtnClick;

  // get tasks menu buttons
  const addTaskBtn = document.querySelector('.tasks-menu__add-task');
  const removeTaskBtn = document.querySelector('.tasks-menu__remove-task');
  
  // add onclick functions to toolbar buttons
  addTaskBtn.onclick;
  removeTaskBtn.onclick;
});
