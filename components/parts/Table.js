var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var _ = require('underscore');

var Tbody = React.createClass({
  render(){
    return(
    <div>
      <p>foo</p>
      <p></p>
    </div>
    )
  }
});

var Table = React.createClass({
	render() {
		return(
			<div>

			<Tbody />

			</div>
		);
	}
});

module.exports = Table;	
