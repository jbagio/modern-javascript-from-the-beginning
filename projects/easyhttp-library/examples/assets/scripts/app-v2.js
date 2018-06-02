const http = new EasyHTTP();

// Usage of the EasyHTTP library with 'jsonplaceholder' testing REST API

// Get all items
// http.get('https://jsonplaceholder.typicode.com/posts')
//   .then(results => console.log(results))
//   .catch(err => console.log(err));

// Get single item
// http.get('https://jsonplaceholder.typicode.com/posts/1')
//   .then(results => console.log(results))
//   .catch(err => console.log(err));

// const data = {
//   title: 'Test new post',
//   body: 'Post added via EasyHTTP'
// };

// Create item
// http.post('https://jsonplaceholder.typicode.com/posts', data)
//   .then(results => console.log(results))
//   .catch(err => console.log(err));


// Update item with id 1
// http.put('https://jsonplaceholder.typicode.com/posts/1', data)
//   .then(results => console.log(results))
//   .catch(err => console.log(err));

// Delete item with id 1
http.delete('https://jsonplaceholder.typicode.com/posts/1')
  .then(results => console.log(results))
  .catch(err => console.log(err));
