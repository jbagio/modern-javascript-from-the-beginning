const http = new EasyHTTP();

// Usage of the EasyHTTP library with 'jsonplaceholder' testing REST API

// Get all items
// http.get('https://jsonplaceholder.typicode.com/posts', (err, posts) => {
//   if (err) throw err;
//   console.log(posts);
// });

// Get single item
// http.get('https://jsonplaceholder.typicode.com/posts/100', (err, post) => {
//   if (err) throw err;
//   console.log(post);
// });

// Create item
// http.post('https://jsonplaceholder.typicode.com/posts',
//   { title: 'Test new post', body: 'Post added via EasyHTTP' },
//   (err, post) => {
//     if (err) throw err;
//     console.log(post);
//   });

// Update item with id 1
// http.put('https://jsonplaceholder.typicode.com/posts/1',
//   { title: 'Test updated post', body: 'Post update via EasyHTTP' },
//   (err, post) => {
//     if (err) throw err;
//     console.log(post);
//   });

// Delete item with id 1
http.delete('https://jsonplaceholder.typicode.com/posts/1', (err, response) => {
  if (err) throw err;
  console.log(response);
});
