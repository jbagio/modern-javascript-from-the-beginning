// DOM elements
const postcodeInput = document.getElementById('postcode');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Register event listeners
function registerEventListeners () {
  postcodeInput.addEventListener('blur', validatePostcode);
  emailInput.addEventListener('blur', validateEmail);
  phoneInput.addEventListener('blur', validatePhone);
}

function validatePostcode () {
  // 0000-000 format
  const regex = /^[0-9]{4}-[0-9]{3}$/;

  regex.test(postcodeInput.value) ? postcodeInput.classList.remove('is-invalid') : postcodeInput.classList.add('is-invalid');
}

function validateEmail () {
  // th1s_is.A-V4lid@aDr3ss.com
  const regex = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,15})$/;

  regex.test(emailInput.value) ? emailInput.classList.remove('is-invalid') : emailInput.classList.add('is-invalid');
}

function validatePhone () {
  // Plus sign followed by country code and national number
  // https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch04s03.html
  const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

  regex.test(phoneInput.value) ? phoneInput.classList.remove('is-invalid') : phoneInput.classList.add('is-invalid');
}

registerEventListeners();
