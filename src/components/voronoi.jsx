var React = require('react');
var Voronoi = require('../charts/voronoi.jsx');


var points = [];
for (var i = 0; i < 20; i++) {
  points.push([2*(Math.random() - 0.5), 2*(Math.random() - 0.5)]);
}

module.exports = React.createClass({
  render: function() {
    return <Voronoi data={ points } />
  }
});