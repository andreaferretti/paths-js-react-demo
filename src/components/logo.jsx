var React = require('react');
var Animate = require('../animate.jsx');
var Bezier = require('paths-js/bezier');

var points = [
  [0, 50],
  [50, 70],
  [100, 40],
  [150, 30],
  [200, 60],
  [250, 80],
  [300, 50]
];

function move(ps) {
  return ps.map(function(p) {
    return [p[0], p[1] - 25 + 50 * Math.random()];
  });
}

module.exports = React.createClass({
  mixins: [Animate.Mixin],
  getInitialState: function() {
    return { points: points };
  },
  goBack: function() {
    this.animateState(
      { points: points },
      { easing: Animate.easing.easeOutElastic }
    );
  },
  shuffle: function() {
    this.animateState(
      { points: move(points) },
      { done: this.goBack }
    );
  },
  render: function() {
    var self = this;
    var line = Bezier({ points: this.state.points });
    var circles = line.path.points().map(function(p) {
      return <circle onClick={ self.shuffle } r={5} cx={p[0]} cy={p[1]} stroke="red" strokeWidth={2} fill="white" />
    });

    return <div id="logo" className="col-md-12">
      <h1><a href="https://github.com/andreaferretti/paths-js">Paths.js</a></h1>
      <h3>Generate SVG paths for geometric shapes</h3>
      <svg width="800" height="100">
        <g transform="translate(100, 0)">
          <path d={ line.path.print() } stroke="red" fill="none" />
          { circles }
        </g>
      </svg>
    </div>
  }
});