var React = require('react');
var Colors = require('../palette/colors.jsx');
var util = require('../palette/util.jsx');
var Graph = require('paths-js/graph');
var _ = require('lodash');


function randomGraph(n, density) {
  var nodes = _.range(n);
  var links = []
  for (var i = 0; i < n - 1; i++) {
    for (var j = i + 1; j < n; j++) {
      if (Math.random() < density) {
        links.push({
          start: i,
          end: j,
          weight: 3 + 5 * Math.random()
        });
      }
    }
  }
  return {
    nodes: nodes,
    links: links
  };
}

var palette = util.palette_to_function(Colors.mix(
  {r: 130, g: 140, b: 210},
  {r: 180, g: 205, b: 150}
));

module.exports = React.createClass({
  componentWillMount: function() {
    setTimeout(this.stop, 5000);
    this.tick();
  },
  getInitialState: function() {
    return {
      moving: true,
      graph: Graph({
        data: randomGraph(20, 0.25),
        width: 450,
        height: 400,
        attraction: 7,
        repulsion: 20
      })
    };
  },
  tick: function() {
    this.setState({ graph: this.state.graph.tick() });
    if (this.state.moving) {
      requestAnimationFrame(this.tick);
    }
  },
  stop: function() {
    this.setState({ moving: false });
  },
  render: function() {
    var edges = this.state.graph.curves.map(function(c) {
      return <path d={ c.link.path.print() } stroke="grey" fill="none" />
    });
    var nodes = this.state.graph.nodes.map(function(n, i) {
      return <circle r={ 5 } cx={ n.point[0] } cy={ n.point[1] }
        stroke="grey" fill={ Colors.string(palette(i)) } />
    });
    return (
      <svg width="500" height="430">
        <g transform="translate(20,20)">
          { edges }
          { nodes }
        </g>
      </svg>
    );
  }
});