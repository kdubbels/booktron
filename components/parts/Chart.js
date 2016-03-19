var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var _ = require('underscore');

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
	console.warn("loading status is: ");
	console.log(ajax);

	if (loading != "loading...") {
		var set = new Set();
		for (var i = 0; i < data.length; i++) {
			set.add(data[i].title != undefined ? data[i].title.genres[0].name : "");
		}
		console.log(set);
		var count = [];
		var titles = [];
		for (var i = 0; i < set.dataStore.length; i++) {
		    titles.push(set.dataStore[i]);
		    count.push(0);
		}
		for (var i = 0; i < data.length; i++) {
		    var position = titles.indexOf(data[i].title.genres[0].name);
		    // console.log(position);
		    count[position] = count[position] + 1;
		}

		var zipped = _.object(titles, count);
		console.log(data);
		console.log(titles);
		console.log(count);
		console.log(zipped);
	}

}

function createSpreadsheet(data){
	var incData = data.books;
	var keyValues = ["titles", "authors"];


		d3.select("#spreadsheet")
		    .append("div")
	        .attr("class", "table");

        d3.select("div.table")
            .append("div")
            .attr("class", "head row")
            .selectAll("div.data")
          .data(keyValues).enter()
            .append("div")
            .attr("class", "data")
            .html(function (d) {return d})
            .style("left", function(d,i) {return (i * 100) + "px";});

        d3.select("div.table")
	         .selectAll("div.datarow")
	      .data(incData, function(d) {return d.id}).enter()
	        .append("div")
	        .attr("class", "datarow row")
	        .style("top", function(d,i) {return (40 + (i * 40)) + "px"});
	        // .on("mouseover", hover)
	        // .on("mouseout", mouseOut);
        
        d3.selectAll("div.datarow")
        .selectAll("div.data")
        .data(function(d) {return d3.entries(d) })
        .enter()
        .append("div")
        .attr("class", "data")
        // .html(function (d, i) {console.warn(d); return d.value })
        // .html(function (d, i) {console.warn(d); return typeof d.value === 'object' ? "foo" : d.value })
        .html(function (d, i) { return typeof d.value === 'object' ? d.value.title != undefined ? d.value.title : d.value.last != undefined ? d.value.first + " " + d.value.last : d.value : d.value })

        .style("left", function(d,i,j) {return (i * 100) + "px"});
}

function createBar(data, target, ajax) {
	formatBarData(data, ajax);

	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(10, "%");

	var svg = d3.select("#bar")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}


var Table = React.createClass({
render() {
	var data = this.props.data;
	createSpreadsheet(data);
        return (
            <div id="spreadsheet">Something</div>
        );
    }
});

var Bar = React.createClass({
render() {
	var data = this.props.data;
	var ajax = this.props.ajax;
	console.log(this.props.ajax);
	createBar(data, "#bar", ajax);
        return (
            <svg id="bar"></svg>
        );
    }
});

var Layout = React.createClass({
	render() {
		var foo = "bar";
		// console.log(this.props.data);
		// console.warn("fffff");
		var piechart = d3.layout.pie();
		var data = this.props.data;
		// console.warn(data);
		// console.warn("foo")
		//console.warn(mypie);
		return <div></div>
	}
});

var Chart = React.createClass({
	render() {
		return(
			<div>
			<Table data={this.props.data} ajax={this.props.ajax} />
			<Bar data={this.props.data} ajax={this.props.ajax} />
			<Layout />
			</div>
		);
	}
});

module.exports = Chart;	

