var React = require('react');
var ReactDOM = require('react-dom');

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

var Row = React.createClass({  
    render() {
        return (
            <tr><td>{this.props.book.author.last}, {this.props.book.author.first}</td><td>{this.props.book.title.title}</td></tr>
        );
    }
})

var Tbody = React.createClass({
    render() {     
      var rows = [];
      var data = this.props.data;
      console.warn(data);
      console.warn(data.books);
      if (data.length != 0) {
          for (var i=0; i < data.books.length; i++) {
              rows.push(<Row key={i} book={data.books[i]} />);
          }
      }
      return <tbody>{rows}</tbody>; 
    }
})

var Table = React.createClass({
    getInitialState: function() {
    return { 
      books: []
     };
    },
    componentWillMount: function() {
    _this = this;
    getURL("http://localhost:3000/api/books.json", function(content, error) {
    if (error != null)
      console.warn("Failed to fetch nonsense.txt: " + error);
    else
      var parsed_content = JSON.parse(content);
      _this.setState({
        books: parsed_content
      });
      console.log(parsed_content);
    });
    },

    render() {
        return (
            <table>
                <thead><tr><th>Author</th><th>Title</th></tr></thead>
                <Tbody data={this.state.books} />
            </table>
        );
    }
})

module.exports = Table;