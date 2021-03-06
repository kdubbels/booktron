var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('./parts/Table');
var BarChart = require('./parts/BarChart');
var Spreadsheet = require('./parts/Spreadsheet')

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

var APP = React.createClass({
    loadDataFromServer: function() {    
    _this = this;
    getURL("http://localhost:3000/api/books.json", function(content, error) {
    if (error != null)
      console.warn("Failed to fetch nonsense.txt: " + error);
    else
      var parsed_content = JSON.parse(content);
      _this.setState({
        books: parsed_content,
        ajax: true
      });
      console.log(parsed_content);
    });
  },
    getInitialState: function() {
    return { 
      books: [], 
      ajax: false,
     };
    },
    componentDidMount: function() {
    this.loadDataFromServer();
    console.log("goodbye world");
    },
    componentWillUnmount: function() {
      this.serverRequest.abort();
    },
    render() {
      console.warn("this.state");
      console.log(this.state);
        return (
            <div>
                <div>
                    <BarChart data={this.state.books} ajax={this.state.ajax} />
                </div>

                <div>
                    
                </div>

            </div>
        );
    }
});

module.exports = APP;