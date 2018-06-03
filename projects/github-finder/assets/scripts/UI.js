class UI {
  constructor () {
    this.profileDiv = document.getElementById('profile');
  }

  renderProfile (profile) {
    this.profileDiv.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${profile.avatar_url}">
            <a href="${profile.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-info"><strong>Public repos</strong>: ${profile.public_repos}</span>
            <span class="badge badge-info"><strong>Public gists</strong>: ${profile.public_gists}</span>
            <span class="badge badge-success"><strong>Followers</strong>: ${profile.followers}</span>
            <span class="badge badge-success"><strong>Following</strong>: ${profile.following}</span>          
            <br><br>
            <ul class="list-group">
              <li class="list-group-item"><strong>Company</strong>: ${profile.company !== null ? profile.company : 'N/A'}</li>
              <li class="list-group-item"><strong>Website</strong>: ${profile.blog !== '' ? profile.blog : 'N/A'}</li>
              <li class="list-group-item"><strong>Location</strong>: ${profile.location !== null ? profile.location : 'N/A'}</li>
              <li class="list-group-item"><strong>Joined</strong>: ${new Date(profile.created_at).toDateString()}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3 text-center">Latest repos</h3>
      <div id="repos"></div>
    `;
  }

  renderRepos (repos) {
    let html = '';

    // Prepare repos markup
    repos.forEach(repo => {
      html += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
              <span class="badge badge-info"><strong>Stars</strong>: ${repo.stargazers_count}</span>
              <span class="badge badge-info"><strong>Watchers</strong>: ${repo.watchers_count}</span>
              <span class="badge badge-success"><strong>Forks</strong>: ${repo.forks_count}</span>
            </div>
          </div>
        </div>
      `;
    });

    // Append to repos section
    document.getElementById('repos').innerHTML = html;
  }

  renderAlert (message, className) {
    this.clearProfile();
    // Create new div with alert message
    const msgDiv = document.createElement('div');
    msgDiv.className = `alert ${className}`;
    msgDiv.appendChild(document.createTextNode(message));

    // Append in profile section
    this.profileDiv.appendChild(msgDiv);

    // Remove message after 3 seconds
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  clearProfile () {
    this.profileDiv.innerHTML = '';
  }
}
