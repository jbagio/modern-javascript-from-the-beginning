// DOM elems
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.getElementById('task');
const filterInput = document.getElementById('filter');
const clearBtn = document.querySelector('.clear-tasks');
const storage = window.localStorage;

// Register event listeners
function registerEventListeners () {
  document.addEventListener('DOMContentLoaded', getPersistedTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filterInput.addEventListener('keyup', filterTasks);
}

function getPersistedTasks () {
  // retrieve persisted tasks if any
  let tasks = storage.getItem('tasks') !== null ? JSON.parse(storage.getItem('tasks')) : [];

  if (tasks.length > 0) {
    tasks.forEach(task => {
      appendNewTask(task);
    });
  }
}

function addTask (e) {
  appendNewTask(taskInput.value);
  // store in local storage
  storeInLocalStorage(taskInput.value);

  // clear input values
  taskInput.value = '';
  filterInput.value = '';

  // prevent form submit
  e.preventDefault();
}

function appendNewTask (taskName) {
  // create new task li
  let li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskName));
  let deleteLink = document.createElement('a');
  deleteLink.className = 'delete-item secondary-content';
  deleteLink.innerHTML = '<i class= "fas fa-trash-alt"></i>';
  li.appendChild(deleteLink);

  // append new li to task list
  taskList.appendChild(li);
}

function storeInLocalStorage (taskName) {
  // retrieve persisted tasks if any
  let tasks = storage.getItem('tasks') !== null ? JSON.parse(storage.getItem('tasks')) : [];

  tasks.push(taskName);
  // persist with new task
  storage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask (e) {
  let target = e.target;
  // elem clicked is <i>
  if (target.classList.contains('fa-trash-alt')) {
    // remove li
    let li = getClosest(target, 'collection-item');
    li.remove();
    removeFromLocalStorage(li.textContent);
  }
}

function removeFromLocalStorage (taskName) {
  // retrieve persisted tasks if any
  let tasks = storage.getItem('tasks') !== null ? JSON.parse(storage.getItem('tasks')) : [];

  // remove matching task(s) from array
  tasks.forEach((task, index) => {
    if (task === taskName) {
      tasks.splice(index, 1);
    }
  });

  storage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks () {
  document.querySelectorAll('.collection-item').forEach(li => li.remove());
  // clear input values
  taskInput.value = '';
  filterInput.value = '';

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage () {
  storage.removeItem('tasks');
}

function filterTasks (e) {
  let filterText = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((li) => {
    let liText = li.textContent;
    // filter text matches task text
    if (liText.toLowerCase().indexOf(filterText) !== -1) {
      li.style.display = 'block';
    } else {
      li.style.display = 'none';
    }
  });
}

// helper to get trasverse up and find element with given class
function getClosest (elem, targetClass) {
  while (!elem.classList.contains(targetClass) && elem.parentElement !== null) {
    elem = elem.parentElement;
  }
  return elem;
}

registerEventListeners();
