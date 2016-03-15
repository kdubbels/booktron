var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('./parts/Table');

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