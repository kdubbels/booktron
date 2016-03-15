var React = require('react');
var ReactDOM = require('react-dom');
var APP = require('./components/APP');

/*

This was breaking on me as is, had to do some stuff to the webpack config to avoid
an `unexpected token` error. See:
http://stackoverflow.com/questions/33460420/babel-loader-jsx-syntaxerror-unexpected-token
https://facebook.github.io/react/blog/2015/12/29/react-v0.14.4.html

*/
function getURL(url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(req.responseText);
    else
      callback(null, new Error("Request failed: " +
                               req.statusText));
  });
  req.addEventListener("error", function() {
    callback(null, new Error("Network error"));
  });
  req.send(null);
}

getURL("http://localhost:3000/api/books.json", function(content, error) {
      if (error != null)
        console.warn("Failed to fetch nonsense.txt: " + error);
      else
        var parsed_content = JSON.parse(content);
        console.warn(parsed_content);
      });

ReactDOM.render(<APP />, document.getElementById('react-container'));