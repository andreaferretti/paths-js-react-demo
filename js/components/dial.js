var React = require('react');
var Pie = require('paths-js/pie');

window.mousex = 0;
window.mousey = 0;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      x: 0,
      y: 0,
      speeds: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },

  componentWillMount: function() {
    setInterval(this.update, 16);
    window.addEventListener('mousemove', function(event) {
      window.mousex = event.clientX;
      window.mousey = event.clientY;
    });
  },

  diff: function(x, y) {
    var deltaX = x - this.state.x;
    var deltaY = y - this.state.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  },

  avgSpeed: function() {
    var tot = 0, len = this.state.speeds.length;
    for (var i = 0; i < len; i++) {
      tot += this.state.speeds[i];
    }

    return tot / len;
  },

  update: function() {
    var speed = this.diff(mousex || 0, mousey || 0);
    this.state.speeds.shift();
    this.state.speeds.push(speed);

    this.setState({
      x: mousex || 0,
      y: mousey || 0
    });
  },

  render: function() {
    var speed = Math.max(Math.min(this.avgSpeed(), 39.9), 0.1);
    var pie = Pie({
      r: 50,
      R: 100,
      center: [0, 0],
      data: [speed, 40 - speed],
      accessor: function(x) { return x }
    });

    return <svg width="375" height="400">
      <linearGradient id="dial-grad">
        <stop stopColor="red" offset="0%"/>
        <stop stopColor="green" offset="100%"/>
      </linearGradient>
      <g transform="translate(200,200)">
        <path d={ pie.curves[0].sector.path.print() } fill="url(#dial-grad)" />
      </g>
    </svg>
  }
});