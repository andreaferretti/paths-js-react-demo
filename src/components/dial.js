var React = require('react');
var Pie = require('paths-js/pie');
var update = require('react-addons-update');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      x: 0,
      y: 0,
      mousey: 0,
      mousex: 0,
      speeds: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },

  handleMouseEvent: function(event) {
    this.setState({
      mousex: event.clientX,
      mousey: event.clientY
    });
  },

  componentWillUnmount: function() {
    window.removeEventListener('mousemove', this.handleMouseEvent);
  },

  // componentWillMount: function() {
  //   window.addEventListener('mousemove', this.handleMouseEvent);
  // },

  componentDidMount: function() {
    setInterval(this.updateSpeeds, 16);
    window.addEventListener('mousemove', this.handleMouseEvent);
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

  updateSpeeds: function() {
    var speed = this.diff(this.state.mousex || 0, this.state.mousey || 0);
    var newSpeeds = update(this.state.speeds, {$push: [speed]});
    newSpeeds.shift();
    this.setState({
      x: this.state.mousex || 0,
      y: this.state.mousey || 0,
      speeds: newSpeeds
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

    return <svg width="375" height="400" onMouseMove={this.handleMouseEvent}>
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
