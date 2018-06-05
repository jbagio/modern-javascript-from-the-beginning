/**
 * Item module
 */
const ItemController = (function () {
  // Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Internal data structure
  const data = {
    items: [],
    currentItem: null,
    totalCalories: 0
  };

  const getItemById = id => {
    const found = data.items.find(item => item.id === id);
    return found;
  };

  /**
   * Return public methods
   */
  return {
    getItems: () => data.items,
    getTotalCalories: () => data.totalCalories,
    addItem: (name, calories) => {
      // Generate an ID. This guarantees enough uniqueness for this case:
      // https://stackoverflow.com/questions/8012002/create-a-unique-number-with-javascript-time#comment80201464_18048162
      let id = performance.now().toString().replace('.', 7);

      // Create new item
      const newItem = new Item(id, name, parseInt(calories));

      // Push to items array
      data.items.push(newItem);

      // Update total calories
      data.totalCalories = data.items.reduce((total, currentItem) => total + currentItem.calories, 0);
    },
    updateItem: (name, calories) => {
      data.currentItem.name = name;
      data.currentItem.calories = parseInt(calories);

      // Update total calories
      data.totalCalories = data.items.reduce((total, currentItem) => total + currentItem.calories, 0);
    },
    getCurrentItem: () => data.currentItem,
    // NOTE: changing this, exposing object ref
    // allows for outside manipulation
    // setCurrentItem: item => {
    //   data.currentItem = item;
    // },
    setCurrentItem: () => {
      console.log('set current');
      // Get id from li marked with data attribute
      const liId = document.querySelector('[data-current-item]').id;

      // li id has 'item-123' format, so extract the number part
      const itemId = liId.split('-')[1];

      data.currentItem = getItemById(itemId);
    },
    clearCurrentItem: () => {
      data.currentItem = null;
    },
    deleteCurrentItem: () => {
      // Filter out all items except current
      data.items = data.items.filter(item => item.id !== data.currentItem.id);

      data.currentItem = null;

      // Update total calories
      data.totalCalories = data.items.reduce((total, currentItem) => total + currentItem.calories, 0);
    },
    deleteAllItems: () => {
      data.items = [];
      data.currentItem = null;
      data.totalCalories = 0;
    },
    logData: () => data
  };
}());

/**
 * UI module
 */
const UIController = (function (itemCtrl) {
  // Selectors for DOM elements
  const uiSelectors = {
    itemForm: '#item-form',
    itemNameInp: '#item-name',
    itemCaloriesInp: '#item-calories',
    itemsUl: '#item-list',
    totalCaloriesSpan: '.total-calories',
    addBtn: '.add-btn',
    deleteBtn: '.delete-btn',
    updateBtn: '.update-btn',
    cancelBtn: '.cancel-btn',
    clearBtn: '.clear-btn'
  };

  /**
   * Internal method
   * clear input values
   */
  const clearInput = () => {
    document.querySelector(uiSelectors.itemNameInp).value = '';
    document.querySelector(uiSelectors.itemCaloriesInp).value = '';
  };

  /**
   * Return public methods
   */
  return {
    renderItems: items => {
      let html = '';

      // Prepare items markup and add it to ul
      items.forEach(item => {
        html += `
          <li id="item-${item.id}" class="collection-item">
            <strong>${item.name}</strong><em> ${item.calories} calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fas fa-pencil-alt"></i></a>
          </li>
        `;
      });

      document.querySelector(uiSelectors.itemsUl).innerHTML = html;
    },
    renderTotalCalories: totalCalories => {
      // Add value to 'Total Calories' span
      document.querySelector(uiSelectors.totalCaloriesSpan).innerHTML = totalCalories;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(uiSelectors.itemNameInp).value.trim(),
        calories: document.querySelector(uiSelectors.itemCaloriesInp).value.trim()
      };
    },
    addItemToForm: () => {
      const item = itemCtrl.getCurrentItem();
      // Add item values to inputs
      document.querySelector(uiSelectors.itemNameInp).value = item.name;
      document.querySelector(uiSelectors.itemCaloriesInp).value = item.calories;
    },
    setDefaultState: () => {
      clearInput();
      document.querySelector(uiSelectors.updateBtn).style.visibility = 'hidden';
      document.querySelector(uiSelectors.deleteBtn).style.visibility = 'hidden';
      document.querySelector(uiSelectors.cancelBtn).style.visibility = 'hidden';
      document.querySelector(uiSelectors.addBtn).style.display = 'inline-block';
      // Clear current item from state
      itemCtrl.clearCurrentItem();
      // Remove data attribute marking current item in the DOM
      if (document.querySelector('[data-current-item]') !== null) {
        document.querySelector('[data-current-item]').removeAttribute('data-current-item');
      }
    },
    setEditState: () => {
      document.querySelector(uiSelectors.updateBtn).style.visibility = 'visible';
      document.querySelector(uiSelectors.deleteBtn).style.visibility = 'visible';
      document.querySelector(uiSelectors.cancelBtn).style.visibility = 'visible';
      document.querySelector(uiSelectors.addBtn).style.display = 'none';
      // Remove data attribute marking current item
      if (document.querySelector('[data-current-item]') !== null) {
        document.querySelector('[data-current-item]').removeAttribute('data-current-item');
      }
    },
    getUiSelectors: () => uiSelectors
  };
}(ItemController));

/**
 * Main app module
 */
const App = (function (itemCtrl, uiCtrl) {
  // Get selectors from UI Controller
  const uiSelectors = uiCtrl.getUiSelectors();

  const registerEventListeners = () => {
    // Using form submit instead of course's button click,
    // so we can have cleaner HTML validation
    document.querySelector(uiSelectors.itemForm).addEventListener('submit', addItemSubmit);

    // UL click - event delegation
    document.querySelector(uiSelectors.itemsUl).addEventListener('click', editItemClick);

    // Update button
    document.querySelector(uiSelectors.updateBtn).addEventListener('click', updateItemClick);

    // Cancel button - pass setDefaultState ref
    document.querySelector(uiSelectors.cancelBtn).addEventListener('click', uiCtrl.setDefaultState);

    // Delete button
    document.querySelector(uiSelectors.deleteBtn).addEventListener('click', deleteItemClick);

    // Clear button
    document.querySelector(uiSelectors.clearBtn).addEventListener('click', clearItemsClick);
  };

  /**
   * Event listeners
   */

  // Form submit event
  const addItemSubmit = e => {
    // If form submit not originated by Add button, cancel
    if (e.explicitOriginalTarget.className.indexOf('add-btn') === -1) {
      e.preventDefault();
      return false;
    }

    // Get input values from UI Controller
    const {name, calories} = uiCtrl.getItemInput(); // Obj destructuring

    // Pass to Item Controller for creation
    itemCtrl.addItem(name, calories);

    // No need to create addItem method on UiController as per the course...
    // Simply re-fetch and re-render items!
    uiCtrl.renderItems(itemCtrl.getItems());
    uiCtrl.renderTotalCalories(itemCtrl.getTotalCalories());

    // Set default state to reset inputs
    uiCtrl.setDefaultState();

    e.preventDefault();
  };

  // Edit icon click event
  const editItemClick = e => {
    // Check for icon click
    if (e.target.classList.contains('edit-item')) {
      // fetch the parent li
      const li = getClosest(e.target, 'collection-item');

      // add data attribute to mark as current item
      li.setAttribute('data-current-item', '');

      // setCurrentItem will place the correct item in state
      itemCtrl.setCurrentItem();

      // place values in form - this will use current item
      uiCtrl.addItemToForm();

      // Switch to edit state - after this, the data-attribute will be cleared from the li
      // so cannot be manipulated externally!
      uiCtrl.setEditState();
    }

    e.preventDefault();
  };

  // Update item click event
  const updateItemClick = e => {
    // Trigger html validation
    if (document.querySelector(uiSelectors.itemForm).checkValidity()) {
      // Get input values from UI controller
      const {name, calories} = uiCtrl.getItemInput();

      // Pass to Item Controller for creation
      itemCtrl.updateItem(name, calories);

      // Re-fetch and re-render items
      uiCtrl.renderItems(itemCtrl.getItems());
      uiCtrl.renderTotalCalories(itemCtrl.getTotalCalories());

      // Switch back to default state
      uiCtrl.setDefaultState();

      e.preventDefault();
    } else {
      // This is needed to trigger the html validation alerts...
      // http://codetheory.in/html5-form-validation-on-javascript-submission/
      document.querySelector(uiSelectors.addBtn).click();
    }
  };

  // Delete item click event
  const deleteItemClick = e => {
    itemCtrl.deleteCurrentItem();

    // Re-fetch and re-render items
    uiCtrl.renderItems(itemCtrl.getItems());
    uiCtrl.renderTotalCalories(itemCtrl.getTotalCalories());

    // Switch back to default state
    uiCtrl.setDefaultState();

    e.preventDefault();
  };

  // Clear items click event
  const clearItemsClick = e => {
    itemCtrl.deleteAllItems();

    // Re-fetch and re-render items
    uiCtrl.renderItems(itemCtrl.getItems());
    uiCtrl.renderTotalCalories(itemCtrl.getTotalCalories());

    // Switch back to default state
    uiCtrl.setDefaultState();

    e.preventDefault();
  };

  /**
   * Helpers
   * helper method to traverse up and find element with given class
   */
  const getClosest = (elem, targetClass) => {
    while (!elem.classList.contains(targetClass) && elem.parentElement !== null) {
      elem = elem.parentElement;
    }
    return elem;
  };

  /**
   * Return public methods
   */
  return {
    init: () => {
      // Register event listeners
      registerEventListeners();

      // Set default state
      uiCtrl.setDefaultState();

      // Get items from data and render them
      uiCtrl.renderItems(itemCtrl.getItems());

      // Get total calories from data and render it
      uiCtrl.renderTotalCalories(itemCtrl.getTotalCalories());
    }
  };
}(ItemController, UIController));

// Initialise app
App.init();
