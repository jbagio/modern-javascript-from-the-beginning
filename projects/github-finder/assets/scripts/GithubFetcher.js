class GithubFetcher {
  constructor () {
    try {
      // Get keys from config file if existent
      this.clientId = config.CLIENT_ID;
      this.clientSecret = config.CLIENT_SECRET;
    }
    catch (ReferenceError) {
      this.clientId = '';
      this.clientSecret = '';
    }
    // Endpoint parameters
    this.repoCount = 5;
    this.repoSort = 'created: asc';
  }

  async getUser (username) {
    const profileEndpoint = `https://api.github.com/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
    const reposEndpoint = `https://api.github.com/users/${username}/repos?per_page=${this.repoCount}&sort=${this.repoSort}&client_id=${this.clientId}&client_secret=${this.clientSecret}`;

    const profileResponse = await fetch(profileEndpoint);
    const reposResponse = await fetch(reposEndpoint);

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    // Return object with nested data
    return {
      profile,
      repos
    };
  }
}
