// DOM elems
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');
const amountInput = document.getElementById('amount');
const interestInput = document.getElementById('interest');
const yearsInput = document.getElementById('years');
const monthlyInput = document.getElementById('monthly-payment');
const totPayInput = document.getElementById('total-payment');
const totIntInput = document.getElementById('total-interest');

function registerEventListeners () {
  // Form submit
  document.querySelector('#loan-form').addEventListener('submit', e => {
    // Hide results and show loading img
    resultsDiv.style.display = 'none';
    loadingDiv.style.display = 'block';

    // calculate results after 2 seconds
    setTimeout(calculateResults, 2000);

    e.preventDefault();
  });
}
function calculateResults (e) {
  // calculation variables
  const principal = parseFloat(amountInput.value);
  const calculatedInterest = parseFloat(interestInput.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsInput.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyInput.value = monthly.toFixed(2);
    totPayInput.value = (monthly * calculatedPayments).toFixed(2);
    totIntInput.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    // Hide loading div and show results
    resultsDiv.style.display = 'block';
    loadingDiv.style.display = 'none';
  } else {
    showError('Please input correct values');
  }
}

function showError (errMsg) {
  // Hide loading div and results
  resultsDiv.style.display = 'none';
  loadingDiv.style.display = 'none';

  // prepare error div
  const errDiv = document.createElement('div');
  errDiv.className = 'alert alert-danger';
  errDiv.appendChild(document.createTextNode(errMsg));

  const cardDiv = document.querySelector('.card');
  const h1 = document.querySelector('.heading');

  // insert errDiv before h1
  cardDiv.insertBefore(errDiv, h1);

  setTimeout(clearError, 3000);
}

function clearError () {
  document.querySelector('.alert').remove();
}

registerEventListeners();
