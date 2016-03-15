var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('./parts/Table');


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
  _this.setState({
    books: parsed_content
  });
  console.log(parsed_content);
  console.log(_this.state);
});

var APP = React.createClass({

    render() {
        return (
            <div>
                <div>
                    <Table />
                </div>

            </div>
        );
    }
});

module.exports = APP;