var React = require('react');
var ReactDom = require('react-dom');
var Composite = require('./components/composite.js');

ReactDom.render(
  <Composite />,
  document.getElementById('content')
);
