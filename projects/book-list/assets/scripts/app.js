// DOM Elements
const form = document.getElementById('book-form');
const table = document.getElementById('book-table');

// For controlling timeout
let timeout;

/*******************************
// Book
*******************************/
function Book (title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

/*******************************
// UI
*******************************/
function UI () {}

// Custom validation
UI.prototype.validateNonEmptyFields = function (book) {
  if (book.title === '' || book.author === '' || book.isbn === '') {
    this.showMessage('Please fill in all fields', 'error');
    return false;
  }
  return true;
};

UI.prototype.validateIsbn = function (book) {
  let found = false;
  // Check if isbn already exists
  const rows = document.querySelectorAll('#book-table tr');
  let existingIsbn;
  Array.from(rows).forEach((row) => {
    existingIsbn = row.children[2].textContent;
    if (existingIsbn === book.isbn) {
      this.showMessage('ISBN already exists!', 'error');
      found = true;
    }
  });
  return !found;
};

UI.prototype.addBookToTable = function (book) {
  // Create new tr with book element
  const row = document.createElement('tr');
  row.className = 'book-row';
  row.innerHTML = `
                  <td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.isbn}</td>
                  <td><a href="#" class="delete">X</a></td>
                  `;
  table.appendChild(row);
};

UI.prototype.removeBookFromTable = function (target) {
  if (target.className === 'delete') {
    this.getClosest(target, 'book-row').remove();
    this.showMessage('Book removed', 'success');
  }
};

// Clear Fields
UI.prototype.clearFields = function () {
  form.reset();
};

UI.prototype.showMessage = function (message, className) {
  // Create new div with alert message
  const msgDiv = document.createElement('div');
  msgDiv.className = `alert ${className}`;
  msgDiv.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container');

  // Clear existing message and timeout if existent
  if (container.contains(document.querySelector('.alert'))) {
    document.querySelector('.alert').remove();
    clearTimeout(timeout);
  }
  // Append before form
  container.insertBefore(msgDiv, form);

  // Remove message after 3 seconds
  timeout = setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
};

// helper to get trasverse up and find element with given class
UI.prototype.getClosest = function (elem, targetClass) {
  while (!elem.classList.contains(targetClass) && elem.parentElement !== null) {
    elem = elem.parentElement;
  }
  return elem;
};

/*******************************
// Local storage
// all methods are static
*******************************/
function Storage () {}

Storage.getBooks = function () {
  // retrieve persisted books if any
  const books = window.localStorage.getItem('books') !== null ? JSON.parse(window.localStorage.getItem('books')) : [];
  return books;
};

Storage.displayBooks = function () {
  const books = Storage.getBooks();

  if (books.length > 0) {
    const ui = new UI();
    books.forEach(book => ui.addBookToTable(book));
  }
};

Storage.storeBook = function (book) {
  const books = Storage.getBooks();

  books.push(book);
  // persist with new book
  window.localStorage.setItem('books', JSON.stringify(books));
};

Storage.removeBook = function (isbn) {
  const books = Storage.getBooks();

  books.forEach((book, index) => {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });
  if (books.length > 0) {
    window.localStorage.setItem('books', JSON.stringify(books));
  } else {
    window.localStorage.removeItem('books');
  }
};

// Register event listeners
function registerEventListeners () {
  const ui = new UI();

  // DOM
  document.addEventListener('DOMContentLoaded', Storage.displayBooks());

  // form
  form.addEventListener('submit', (e) => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    if (ui.validateNonEmptyFields(book) && ui.validateIsbn(book)) {
      ui.addBookToTable(book);
      Storage.storeBook(book);
      ui.clearFields();
      ui.showMessage('Book inserted', 'success');
    }

    // prevent form submit
    e.preventDefault();
  });

  // Table for event delegation
  table.addEventListener('click', (e) => {
    ui.removeBookFromTable(e.target);
    // trasverse DOM to get isbn value
    const isbn = e.target.parentElement.previousElementSibling.textContent;
    Storage.removeBook(isbn);
    e.preventDefault();
  });
}

registerEventListeners();
