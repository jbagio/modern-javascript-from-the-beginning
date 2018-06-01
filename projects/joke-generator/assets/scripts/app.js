// Register event listeners
function registerEventListeners () {
  document.getElementById('jokes-form').addEventListener('submit', getJokes);
}

function getJokes (e) {
  const nrJokes = document.querySelector('input[type="number"]').value;
  const jokesEndpoint = `https://api.icndb.com/jokes/random/${nrJokes}`;

  // Get jokes via XMLHttpRequest
  const xhr = new window.XMLHttpRequest();

  xhr.open('GET', jokesEndpoint, true);

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      let resultsHtml = '';

      // response obj is {type: "success", value: resultsArray}
      if (response.type === 'success') {
        // Iterate results on value prop
        response.value.forEach(result => {
          resultsHtml += `<li>${result.joke}</li>`;
        });
      } else {
        resultsHtml += `<li>Could not fetch jokes</li>`;
      }
      // Inject jokes in ul
      document.querySelector('.jokes').innerHTML = resultsHtml;
    }
  };

  xhr.send();

  e.preventDefault();
}

registerEventListeners();
