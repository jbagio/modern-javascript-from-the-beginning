// Item module
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

  // Public methods
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
      data.totalCalories += newItem.calories;
    },
    logData: () => data
  };
}());

// UI module
const UIController = (function () {
  // Selectors for DOM elements
  const uiSelectors = {
    // Using form submit instead of course's button click,
    // so we can have cleaner validation
    itemForm: '#item-form',
    itemNameInp: '#item-name',
    itemCaloriesInp: '#item-calories',
    itemsUl: '#item-list',
    totalCaloriesSpan: '.total-calories'
  };

  // Public methods
  return {
    renderItems: items => {
      let html = '';

      // Prepare items markup and add it to ul
      items.forEach(item => {
        html += `
          <li id="item-${item.id}" class="collection-item">
            <strong>${item.name}</strong><em> ${item.calories} calories</em>
            <a href="#" class="secondary-content"><i class="fas fa-pencil-alt"></i></a>
          </li>
        `;
      });

      document.querySelector(uiSelectors.itemsUl).innerHTML = html;
    },
    renderTotalCalories: totalCalories => {
      // Add value to 'Total Calories' span
      document.querySelector(uiSelectors.totalCaloriesSpan).innerHTML = totalCalories;
    },
    getUiSelectors: () => uiSelectors,
    // Grab and return item input values
    getItemInput: () => {
      return {
        name: document.querySelector(uiSelectors.itemNameInp).value.trim(),
        calories: document.querySelector(uiSelectors.itemCaloriesInp).value.trim()
      };
    },
    clearInput: () => {
      document.querySelector(uiSelectors.itemNameInp).value = '';
      document.querySelector(uiSelectors.itemCaloriesInp).value = '';
    }
  };
}());

// Main app module
const App = (function (itemCtrl, uiCtrl) {
  const registerEventListeners = () => {
    // Get selectors from UI Controller
    const uiSelectors = uiCtrl.getUiSelectors();

    // Form submit event listener
    document.querySelector(uiSelectors.itemForm).addEventListener('submit', addItemSubmit);
  };

  // Event listeners
  // Add item button
  const addItemSubmit = e => {
    // Get input values from UI Controller
    const {name, calories} = uiCtrl.getItemInput(); // Obj destructuring

    // Pass to Item Controller for creation
    itemCtrl.addItem(name, calories);

    // No need to create addItem method on UiController as per the course...
    // Simply re-fetch and re-render items!
    uiCtrl.renderItems(itemCtrl.getItems());
    uiCtrl.renderTotalCalories(itemCtrl.getTotalCalories());

    uiCtrl.clearInput();

    e.preventDefault();
  };

  // Public methods
  return {
    init: () => {
      // Register event listeners
      registerEventListeners();

      // Get items from data and render them
      uiCtrl.renderItems(itemCtrl.getItems());

      // Get total calories from data and render it
      uiCtrl.renderTotalCalories(itemCtrl.getTotalCalories());
    }
  };
}(ItemController, UIController));

// Initialise app
App.init();
