// Item module
const ItemController = (function () {
  // Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Internal state / data structure
  const state = {
    // Some temp initial data
    items: [
      {id: 1, name: 'Chickpea curry', calories: 350},
      {id: 2, name: 'Mashed surprise', calories: 550},
      {id: 3, name: 'Green smoothie', calories: 220}
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: () => state.items,
    logState: () => state
  };
}());

// UI module
const UIController = (function () {
  // Selectors for elements
  const uiSelectors = {
    itemList: '#item-list'
  };

  // Public methods
  return {
    renderItems: items => {
      let html = '';

      // Prepare items markup
      items.forEach(item => {
        html += `
          <li id="item-${item.id}" class="collection-item">
            <strong>${item.name}</strong><em> ${item.calories} calories</em>
            <a href="#" class="secondary-content"><i class="fas fa-pencil-alt"></i></a>
          </li>
        `;
      });

      // Append to items list section
      document.querySelector(uiSelectors.itemList).innerHTML = html;
    }
  };
}());

// Main app module
const App = (function (itemCtrl, uiCtrl) {
  // Public methods
  return {
    init: () => {
      const items = itemCtrl.getItems();
      uiCtrl.renderItems(items);
    }
  };
}(ItemController, UIController));

// Initialise app
App.init();
