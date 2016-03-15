var React = require('react');
var ReactDOM = require('react-dom');
var APP = require('./components/APP');

/*

This was breaking on me as is, had to do some stuff to the webpack config to avoid
an `unexpected token` error. See:
http://stackoverflow.com/questions/33460420/babel-loader-jsx-syntaxerror-unexpected-token
https://facebook.github.io/react/blog/2015/12/29/react-v0.14.4.html

*/

ReactDOM.render(<APP />, document.getElementById('react-container'));