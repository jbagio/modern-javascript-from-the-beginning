/**
 * EasyHTTP Library - wrapper for making HTTP requests
 * This version uses XMLHttpRequest and callbacks
 * @version 1.0.0
 */
function EasyHTTP () {
  this.http = new XMLHttpRequest(); // eslint-disable-line
}

// GET request
EasyHTTP.prototype.get = function (url, callback) {
  // async request
  this.http.open('GET', url, true);

  // inner function on a method, 'this' will be the global object
  // so use self trick or arrow function
  const self = this;
  this.http.onload = function () {
    if (self.http.status === 200) {
      callback(null, self.http.responseText);
    } else {
      // silly 'no-callback-literal' jsstandard rule --
      // eslint-disable-next-line
      callback(`EasyHTTP GET error: ${self.http.status}`);
    }
  };

  this.http.send();
};

// POST request
EasyHTTP.prototype.post = function (url, data, callback) {
  // async request
  this.http.open('POST', url, true);

  this.http.setRequestHeader('Content-type', 'application/json');

  const self = this;
  this.http.onload = function () {
    callback(null, self.http.responseText);
  };

  this.http.send(JSON.stringify(data));
};

// PUT request
EasyHTTP.prototype.put = function (url, data, callback) {
  // async request
  this.http.open('PUT', url, true);

  this.http.setRequestHeader('Content-type', 'application/json');

  const self = this;
  this.http.onload = function () {
    callback(null, self.http.responseText);
  };

  this.http.send(JSON.stringify(data));
};

// DELETE request
EasyHTTP.prototype.delete = function (url, callback) {
  // async request
  this.http.open('DELETE', url, true);

  const self = this;
  this.http.onload = function () {
    if (self.http.status === 200) {
      callback(null, 'Item deleted successfully');
    } else {
      // silly 'no-callback-literal' jsstandard rule --
      // eslint-disable-next-line
      callback(`EasyHTTP DELETE error: ${self.http.status}`);
    }
  };

  this.http.send();
};
