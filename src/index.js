var React = require('react');
var ReactDom = require('react-dom');
var Composite = require('./components/composite');

var _ = "css/" + 'main.css';

ReactDom.render(<Composite />, document.getElementById('content'));