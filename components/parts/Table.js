var React = require('react');
var ReactDOM = require('react-dom');


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
    componentDidMount: function() {
    _this = this;
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