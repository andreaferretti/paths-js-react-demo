var React = require('react');
var SmootLine = require('paths-js/smooth-line');
var Linear = require('paths-js/linear');
var _ = require('lodash');

var hs = 3; // handle size

module.exports = React.createClass({
  getInitialState: function() {
    return {
      x1: 0,
      x2: 1,
      lastX: 0,
      lastPos: 0,
      mouseDown: false,
      dragging: "x1"
    }
  },
  rectangle: function() {
    var x = Math.floor(Math.min(this.state.x1, this.state.x2) * this.props.width);
    var w = Math.floor(Math.abs(this.state.x1 - this.state.x2) * this.props.width);
    return <rect key="rect" x={x} y={0} width={w} height={this.props.height} fill="rgba(120, 120, 120, 0.3)"
    onDoubleClick={ this.expand } />
  },
  handle: function(i) {
    var x = Math.floor(this.state[i] * this.props.width);
    return <rect x={x-hs} y={0} width={2 * hs} height={this.props.height}
      className="clickable" stroke="grey" fill="rgba(120, 120, 120, 0.1)"
      data-index={i} key={i} onMouseDown={ this.dragStart } />
  },
  expand: function() {
    this.props.zoom({
      dateMin: -Infinity,
      dateMax: Infinity
    });
    this.setState({
      x1: 0,
      x2: 1
    });
  },
  dragStart: function(e) {
    e.preventDefault();
    var i = e.target.getAttribute("data-index");
    this.setState({
      mouseDown: true,
      lastX: this.state[i],
      lastPos: e.pageX,
      dragging: i
    });
  },
  drag: function(e) {
    if (! this.state.mouseDown) return;
    var diff = (e.pageX - this.state.lastPos) / this.props.width;
    var s = {};
    s[this.state.dragging] = this.state.lastX + diff
    this.setState(s);
  },
  dragEnd: function(e) {
    var min = _.min(this.props.data.map(this.props.xaccessor));
    var max = _.max(this.props.data.map(this.props.xaccessor));
    var scale = Linear([0, 1], [min, max]);
    this.props.zoom({
      dateMin: scale(Math.min(this.state.x1, this.state.x2)),
      dateMax: scale(Math.max(this.state.x1, this.state.x2))
    });
    this.setState({
      mouseDown: false,
      lastX: this.state[this.state.dragging]
    });
  },
  render: function() {
    var chart = SmootLine({
      data: [this.props.data],
      xaccessor: this.props.xaccessor,
      yaccessor: this.props.yaccessor,
      width: this.props.width,
      height: this.props.height,
      closed: true
    });
    return (
      <svg width={this.props.width + 2 * hs + 1} height={this.props.height+5}>
        <g transform={ "translate("+(hs+1)+",3)" } onMouseMove={ this.drag } onMouseUp={ this.dragEnd }>
          <path key="path" d={ chart.curves[0].area.path.print() } stroke="none" fill="rgba(120, 129, 194, 0.6)"/>
          { this.rectangle() }
          { this.handle("x1") }
          { this.handle("x2") }
        </g>
      </svg>
    )
  }
});