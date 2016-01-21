var React = require('react');
var SmootLine = require('paths-js/smooth-line');
var _ = require('lodash');

function coords(el) {
  if (el == null) { return {x: 0, y: 0} }
  var parentCoords = coords(el.offsetParent);
  return {
    x: el.offsetLeft + parentCoords.x,
    y: el.offsetTop + parentCoords.y
  }
}

module.exports = React.createClass({
  getInitialState: function() {
    return {
      dateMin: -Infinity,
      dateMax: Infinity,
      svgCoords: { x: 0, y: 0 },
      mouseDown: false,
      x0: null,
      x1: null,
      y0: null,
      y1: null
    }
  },
  rectangle: function() {
    if (this.state.x0 == null) return null;
    var x = Math.min(this.state.x0, this.state.x1);
    var y = Math.min(this.state.y0, this.state.y1);
    var w = Math.abs(this.state.x1 - this.state.x0);
    var h = Math.abs(this.state.y1 - this.state.y0);

    return <rect x={ x } y={ y } width={ w } height={ h } stroke="none" fill="rgba(120, 129, 194, 0.6)" />
  },
  svgCoords: function() {
    var el = this.refs.svg.getDOMNode();
    return coords(el);
  },
  svgMouseCoords: function(e, recomputeSvgCoords) {
    if (recomputeSvgCoords) {
      var svgCoords = this.svgCoords();
      this.setState({ svgCoords: svgCoords });
    }
    else {
      var svgCoords = this.state.svgCoords;
    }
    return {
      x: e.pageX - svgCoords.x,
      y: e.pageY - svgCoords.y
    };
  },
  dragStart: function(e) {
    var coords = this.svgMouseCoords(e, true);
    this.setState({
      mouseDown: true,
      x0: coords.x,
      x1: coords.x,
      y0: coords.y,
      y1: coords.y
    });
  },
  drag: function(e) {
    if (! this.state.mouseDown) return;
    var coords = this.svgMouseCoords(e, false);
    this.setState({
      x1: coords.x,
      y1: coords.y
    });
  },
  dragEnd: function(e) {
    var data = this.filter(this.props.data);
    var chart = this.makeChart(data);
    var scale = chart.xscale.inverse();
    var coords = this.svgMouseCoords(e, false);
    var start = this.state.x0;
    var end = coords.x
    this.setState({
      mouseDown: false,
      dateMin: scale(Math.min(start, end)),
      dateMax: scale(Math.max(start, end)),
      x0: null,
      x1: null,
      y0: null,
      y1: null
    });
  },
  reset: function() {
    this.setState({
      dateMin: -Infinity,
      dateMax: Infinity
    });
  },
  filter: function(data) {
    var dateMin = this.state.dateMin;
    var dateMax = this.state.dateMax;
    var xaccessor = this.props.xaccessor;
    return data.filter(function(d) {
      var timestamp = xaccessor(d);
      return (timestamp >= dateMin) && (timestamp <= dateMax);
    });
  },
  makeChart: function(data) {
    return SmootLine({
      data: [data],
      xaccessor: this.props.xaccessor,
      yaccessor: this.props.yaccessor,
      width: 400,
      height: 280,
      closed: true
    });
  },
  render: function() {
    var data = this.filter(this.props.data);
    if (data.length < 3) {
      return (
        <div className="empty-timeline">
          <div>
            <span onClick={ this.reset } className="label label-primary clickable">Reset zoom</span>
          </div>
          <div className="jumbotron">
            <p>Too few points to display</p>
          </div>
        </div>)
    }
    var chart = this.makeChart(data);
    var curve = chart.curves[0];
    var min = Math.min(_.min(data.map(this.props.yaccessor)), 0);
    var max = _.max(data.map(this.props.yaccessor));
    var dateMin = Math.max(_.min(data.map(this.props.xaccessor)), this.state.dateMin);
    var dateMax = Math.min(_.max(data.map(this.props.xaccessor)), this.state.dateMax);
    var xscale = chart.xscale;
    var yscale = chart.yscale;
    var points = curve.line.path.points().map(function(p) {
      return <circle r={3} cx={p[0]} cy={p[1]} stroke="rgb(120, 129, 194)" fill="white" />
    });
    return (
      <div>
        <div>
          <span onClick={ this.reset } className="label label-primary clickable">Reset zoom</span>
        </div>
        <div ref="svg">
          <svg width={500} height={375} onMouseDown={ this.dragStart } onMouseMove={ this.drag } onMouseUp={ this.dragEnd } >
            <g transform="translate(50, 50)">
              <path d={ curve.line.path.print() } stroke="rgb(120, 129, 194)" fill="none"/>
              <path d={ curve.area.path.print() } stroke="none" fill="rgba(120, 129, 194, 0.6)"/>
              <line x1={ xscale(dateMin) } y1={ yscale(min) + 10 } x2={ xscale(dateMin) } y2={ yscale(max) - 10 } stroke="#333333" />
              <line y1={ yscale(0) } x1={ xscale(dateMin) - 10 } y2={ yscale(0) } x2={ xscale(dateMax) + 10 } stroke="#333333" />
              { points }
            </g>
            { this.rectangle() }
          </svg>
        </div>
      </div>
    )
  }
});