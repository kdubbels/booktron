var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var _ = require('underscore');
var Table = require('./Table');

function add(data) {
if (this.dataStore.indexOf(data) < 0) {
	this.dataStore.push(data);
		return true;
	} else {
		return false;
	}
}

function Set() {
    this.dataStore = [];
    this.add = add;
}

function formatBarData(incdata, ajax) {
	'use strict';
	var data = incdata;
    if (ajax == true) {
		var set = new Set();
		for (var i = 0; i < data.length; i++) {
			set.add(data[i].title != undefined ? data[i].title.genres[0].name : "");
		}
		var count = [];
		var genres = [];
		for (var i = 0; i < set.dataStore.length; i++) {
		    genres.push(set.dataStore[i]);
		    count.push(0);
		}
		for (var i = 0; i < data.length; i++) {
		    var position = genres.indexOf(data[i].title.genres[0].name);
		    count[position] = count[position] + 1;
		}

		var book_data_array = []; //final format of book colleciton for display as bar chart
		for (var i = 0; i < genres.length; i++) {
			var obj = {};
			obj.count = count[i];
			obj.genre = genres[i];
			book_data_array.push(obj);
		}
		return book_data_array;
	}
}

var margin = {top: 30, right: 20, bottom: 100, left: 40},
width = 960 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;


var XAxis = React.createClass({
	render() {
		var ajax = this.props.ajax;
		if (ajax == true) {
			var data = formatBarData(this.props.books.books, true);


			var x = d3.scale.ordinal()
		    	.rangeRoundBands([0, width], .1);
		
			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom")
			    .tickSize(0);

			x.domain(data.map(function(d) { return d.genre; }));
			d3.select(".x axis")
		       .attr("transform", "translate(5," + (height+5) + ")")
		       .call(xAxis)
		     .selectAll("text")
		       .attr("transform", "rotate(45)")
		       .style("text-anchor", "start");
		}

		return(
			<g className="x axis"></g>
		);
	}
});

var YAxis = React.createClass({
	render() {
		var ajax = this.props.ajax;
		if (ajax == true) {
			var data = formatBarData(this.props.books.books, ajax);
console.warn(data);
			var y = d3.scale.linear()
			    .range([height, 0]);
			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left")
			    .ticks(10);
			
			y.domain([0, d3.max(data, function(d) { return d.count; })]);

		    d3.select(".y axis").append("circle").attr("class", "foobar");
		      //   .call(yAxis)
		      // .append("text")
		      //   .attr("transform", "rotate(-90)")
		      //   .attr("y", 6)
		      //   .attr("dy", ".71em")
		      //   .style("text-anchor", "end")
		      //   .text("Count");
		}

		return(
			<g className="y axis"></g>
		);
	}
});

var Rect = React.createClass({
		handleClick: function(event) {
    console.warn(this);
  },
	render() {

		return(
			<rect  onClick={this.handleClick} className="bar" height={this.props.height} width={this.props.width} x={this.props.x} y={this.props.y} ></rect>
		);
	}
});

var Rects = React.createClass({
	handleClick: function(event) {
    console.warn(this);
  },
	render() {
		var ajax = this.props.ajax;


		var x = d3.scale.ordinal()
		    .rangeRoundBands([0, width], .1);

		var y = d3.scale.linear()
		    .range([height, 0]);


		if (ajax == true) {
			var incData = this.props.books.books;
			var formattedData = formatBarData(incData, ajax);
			var data = _.sortBy(formattedData, 'genre');

			x.domain(data.map(function(d) { return d.genre; }));
	    	y.domain([0, d3.max(data, function(d) { return d.count; })]);

		} else {
			var data = [];
		}


	return(
<g>
{data.map(function(datum, index){
            return <Rect onClick={this.handleClick} key={ index } x={x(datum.genre)} y={y(datum.count)} width={x.rangeBand()} height={height - y(datum.count)} genre={datum.genre} count={datum.count} />;
            })}
</g>
	);
}
});

var Bar = React.createClass({
	getInitialState: function() {
	     return {
	     	foo: "foo"
	 	};
	  },
	render() {
		// var data = this.props.data;
		var ajax = this.props.ajax;

		var svg = d3.select("#bar")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom);

	    if (ajax == true) {
		}
	        return (
	            <svg id="bar">
	            	<g transform="translate(40,30)" id="g">
		            	<XAxis books={this.props.books} ajax={this.props.ajax} />
		            	<YAxis books={this.props.books} ajax={this.props.ajax} />
		            	<Rects books={this.props.books} ajax={this.props.ajax} />
		            </g>
	            </svg>
	        );
	    
	}
});

var Child = React.createClass({
  render: function () {
    return <div onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}>{this.props.text}</div>;
  },
});

var Parent = React.createClass({
  getInitialState: function() {
     return {
     	childText: "Click me! (parent prop)",
     	foo: "foo",
        filter: ""
 	};
  },
  render: function () {
    return (
    	<div>
    		<Child onMouseOver={this.handleChildMouseOver} onMouseOut={this.handleChildMouseOut} text={this.state.childText} />
    		<Bar books={this.props.books} ajax={this.props.ajax} />
    	</div>
    );
  },
  handleChildMouseOver: function(event) {
     // You can access the prop you pass to the children 
     // because you already have it! 
     // Here you have it in state but it could also be
     //  in props, coming from another parent.
     console.warn("The Child button text is: " + this.state.childText);
     // You can also access the target of the click here 
     // if you want to do some magic stuff
     console.warn("The Child HTML is: " + event.target.outerHTML);
     this.setState({
     	foo: "bar",
     	childText: "Hello world",
     	filter: "You now have filtered data"
     });
  },
  handleChildMouseOut: function(event) {
  	this.setState({
  		foo: "baz",
  		childText: "Goodbye world",
  		filter: ""
  	});
  }
});
var BarChart = React.createClass({
	render() {
		return(
			<div>
			<Parent books={this.props.data} ajax={this.props.ajax} />
			</div>
		);
	}
});
module.exports = BarChart;	


