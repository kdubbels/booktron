// THIS IS THE ORIGINAL VERSION OF `BarChart.js` before refactoring into React components


var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var _ = require('underscore');
var Table = require('./Table');

function click(hoverD) {
	var nestArray = hoverD || [];
	console.warn(nestArray);
}

function hover(hoverD) {
	var nestArray = hoverD || [];
	// d3.selectAll("circle").filter(function (d) {return d == hoverD}).style("fill", "#94B8FF");
	d3.selectAll("rect").filter(function (d) { return d.genre == hoverD.genre ? d : ""  })
	     .style("stroke", "#fff")
	     .style("fill", "#fff");
	     
	d3.selectAll("div.datarow")
	    // .filter(function (d) {console.warn(d); return d == hoverD || nestArray.indexOf(d) > -1})
	    .filter(function (d) { return d.genre != hoverD.genre ? d : "" })
	    .style("background", "white");
}

function mouseOut() {
    // d3.selectAll("circle").style("fill", function(d) {return depthScale(d.depth)});
    d3.selectAll("rect")
        .style("stroke", "#fff")
	    .style("fill", "#fb887c");
    d3.selectAll("div.datarow")
        .style("stroke", "#fff")
	    .style("background", "#fb887c");   
}

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
	var data = incdata.books;
	var loading = ajax;
	// console.warn("loading status is: ");
	// console.log(ajax);

	if (loading != "loading...") {
		var set = new Set();
		for (var i = 0; i < data.length; i++) {
			set.add(data[i].title != undefined ? data[i].title.genres[0].name : "");
		}
		// console.log(set);
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

		// console.log(genres);
		// console.log(count);
		// console.warn('this is book_data_arrayped');
		// console.log(book_data_array);
		return book_data_array;
	}

}

function createBar(data, target, ajax) {
	var formattedData = formatBarData(data, ajax);
	var data = _.sortBy(formattedData, 'genre');

	var margin = {top: 30, right: 20, bottom: 100, left: 40},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom")
	    .tickSize(0);

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(10);

	var svg = d3.select("#bar")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// see for reference: https://bl.ocks.org/mbostock/3885304
    x.domain(data.map(function(d) { return d.genre; }));
    y.domain([0, d3.max(data, function(d) { return d.count; })]);

    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(5," + (height+5) + ")")
       .call(xAxis)
     .selectAll("text")
       .attr("transform", "rotate(45)")
       .style("text-anchor", "start");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Count");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.genre); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); })
        .on("click", click)
        .on("mouseover", hover)
        .on("mouseout", mouseOut);
}

var Bar = React.createClass({
	render() {
		var data = this.props.data;
		var ajax = this.props.ajax;

		// console.log(this.props.ajax);
	    if (ajax != "loading...") {
		    createBar(data, "#bar", ajax);
		}
	        return (
	            <svg id="bar"></svg>
	        );
	    }
});

var BarChart = React.createClass({
	render() {
		return(
			<div>
			<Bar data={this.props.data} ajax={this.props.ajax} />
			<Table data={'qwerty'} />
			</div>
		);
	}
});

module.exports = BarChart;	


