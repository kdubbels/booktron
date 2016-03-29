var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var _ = require('underscore');

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

function formatSpreadsheetData(incdata) {
    if(incdata != undefined) {
	    for (var i = 0; i < incdata.length; i++) {
	    	// console.warn(incdata[i].title.genres[0].name);
	    	incdata[i].genre = incdata[i].title.genres[0].name;
	    }
	    // console.log(incdata);
	    return incdata;
    } else {
    	return incdata;
    }
}

function createSpreadsheet(data){
	var incomingData = data.books;
	var incData = formatSpreadsheetData(incomingData);
	var keyValues = ["titles", "authors"];

    d3.select("#spreadsheet")
        .append("tr")
        .attr("class", "head row")
        .selectAll("div.data")
        .data(keyValues)
      .enter()
        .append("th")
        .attr("class", "data")
        .html(function (d) { return d})
        .style("left", function(d,i) { return (i * 100) + "px";});

    d3.select("#spreadsheet")
         .selectAll("tr.datarow")
         .data(incData, function(d) { return d.id})
      .enter()
        .append("tr")
        .attr("class", "datarow row")
        .style("top", function(d,i) { return (40 + (i * 40)) + "px"})
        .on("mouseover", hover)
        .on("mouseout", mouseOut);
    
    d3.selectAll("tr.datarow")
        .selectAll("td.data")
        .data(function(d) {console.log(d); console.warn(d3.entries(_.omit(d, 'id'))); return d3.entries(_.omit(d, 'id')) })
      .enter()
        .append("td")
        .attr("class", "data")
        .html(function (d, i) { return typeof d.value === 'object' ? d.value.title != undefined ? d.value.title : d.value.last != undefined ? d.value.first + " " + d.value.last : d.value : d.value })
        .style("left", function(d,i,j) {return (i * 100) + "px"})

}

var Spreadsheet = React.createClass({
	render() {
		var data = this.props.data;
		createSpreadsheet(data);
	        return (
	            <table id="spreadsheet" className="table">Something</table>
	        );
	    }
});

var Chart = React.createClass({
	render() {
		return(
			<div>

			<Spreadsheet data={this.props.data} ajax={this.props.ajax} />

			</div>
		);
	}
});

module.exports = Spreadsheet;	