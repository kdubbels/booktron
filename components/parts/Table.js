var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var _ = require('underscore');

var Row = React.createClass({  
    render() {
        // console.log(this.props.book.title.genres[0]);
        return (
            <tr><td>{this.props.book.author.first} {this.props.book.author.last}</td><td>{this.props.book.title.title}</td><td>{this.props.book.title.genres[0].name}</td></tr>
        );
    }
})

var Tbody = React.createClass({
    render() {     
      var rows = [];
      var data = this.props.data;
      // console.warn(data);
      // console.warn(data.books);
      if (data.length != 0) {
          for (var i=0; i < data.books.length; i++) {
              rows.push(<Row key={i} book={data.books[i]} />);
          }
      }
      return <tbody>{rows}</tbody>; 
    }
})

var Table = React.createClass({
	render() {
		return(
			<table>

			<Tbody data={this.props.data} ajax={this.props.ajax} />

			</table>
		);
	}
});

module.exports = Table;	
