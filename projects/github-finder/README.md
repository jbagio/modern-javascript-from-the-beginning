## GitHub finder

### [Demo here](https://rawgit.com/jbagio/modern-javascript-from-the-beginning/master/projects/github-finder/index.html)

Fetch and display a GH user's profile and repos from the [GitHub REST API](https://developer.github.com/v3/) using fetch, async/await and promises.

**NOTE: The API keys were deliberately hidden, so this demo version has a limited number of requests.**
, you will to to grab your own GitHub API keys, clone or download this repo, navigate to /projects/github-finder and manually create the following config.js file:

```javascript
const config = {
  CLIENT_ID: 'your_client_id',
  CLIENT_SECRET: 'your_client_secret'
}
```

You can then open the app locally on your browser and it will pick up these keys.
