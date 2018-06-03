function init () {
  const ghf = new GithubFetcher();
  const ui = new UI();
  // Register event listeners

  // Search form submit
  document.getElementById('search-form').addEventListener('submit', (e) => {
    const usernameText = document.getElementById('username').value;

    if (usernameText !== '') {
      ghf.getUser(usernameText)
        .then(user => {
          if (user.profile.message !== 'Not Found') {
            ui.renderProfile(user.profile);
            ui.renderRepos(user.repos);
          } else {
            ui.renderAlert('User not found', 'alert alert-danger');
          }
        })
        .catch(err => console.log(err));
    } else {
      ui.clearProfile();
    }

    e.preventDefault();
  });

  // Search button keyup
  document.getElementById('username').addEventListener('keyup', (e) => {
    // If text cleared, clear profile
    if (e.target.value === '') {
      ui.clearProfile();
    }
  });
}

init();
