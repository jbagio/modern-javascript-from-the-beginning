/**
 * EasyHTTP Library - wrapper for making HTTP requests
 * This version uses fetch, ES6 classes and ES7 async/await
 * @version 3.0.0
 */

class EasyHTTP {
  // GET request
  async get (url) {
    try {
      const response = await fetch(url);

      const json = await response.json();

      return json;
    } catch (error) {
      return new Error(`EasyHTTP GET error: ${error}`);
    }
  }

  // POST request
  async post (url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const json = await response.json();
      
      return json;

    } catch (error) {
      return new Error(`EasyHTTP POST error: ${error}`);
    }
  }

  // PUT request
  async put (url, data) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const json = await response.json();

      return json;

    } catch (error) {
      return new Error(`EasyHTTP PUT error: ${error}`);
    }
  }

  // DELETE request
  async delete (url) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });

      return response.status === 200 ? 'Item deleted successfully' : 'Could not delete item';

    } catch (error) {
      return new Error(`EasyHTTP DELETE error: ${error}`);
    }
      
  }
}
