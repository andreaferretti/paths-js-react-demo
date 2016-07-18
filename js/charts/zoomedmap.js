var React = require('react');
var SmootLine = require('paths-js/smooth-line');
var Linear = require('paths-js/linear');
var _ = require('lodash');

module.exports = React.createClass({
  filteredData: function() {
    var dateMin = this.props.dateMin;
    var dateMax = this.props.dateMax;
    var xaccessor = this.props.xaccessor;
    return this.props.data.filter(function(d) {
      var timestamp = xaccessor(d);
      return (timestamp >= dateMin) && (timestamp <= dateMax);
    });
  },
  render: function() {
    var data = this.filteredData();
    var chart = SmootLine({
      data: [data],
      xaccessor: this.props.xaccessor,
      yaccessor: this.props.yaccessor,
      width: this.props.width,
      height: this.props.height,
      closed: true
    });
    var curve = chart.curves[0];
    var min = Math.min(_.min(data.map(this.props.yaccessor)), 0);
    var max = _.max(data.map(this.props.yaccessor));
    var dateMin = _.min(data.map(this.props.xaccessor));
    var dateMax = _.max(data.map(this.props.xaccessor));
    var xscale = chart.xscale;
    var yscale = chart.yscale;
    var points = curve.line.path.points().map(function(p, i) {
      return <circle key={i} r={3} cx={p[0]} cy={p[1]} stroke="rgb(120, 129, 194)" fill="white" />
    });
    return (
      <svg width={this.props.width} height={this.props.height+10}>
        <g transform="translate(0,5)">
          <path key="line" d={ curve.line.path.print() } stroke="rgb(120, 129, 194)" fill="none"/>
          <path key="area" d={ curve.area.path.print() } stroke="none" fill="rgba(120, 129, 194, 0.6)"/>
          <line key="xaxis" x1={ xscale(dateMin) } y1={ yscale(min) + 10 } x2={ xscale(dateMin) } y2={ yscale(max) - 10 } stroke="#333333" />
          <line key="yaxis" y1={ yscale(0) } x1={ xscale(dateMin) - 10 } y2={ yscale(0) } x2={ xscale(dateMax) + 10 } stroke="#333333" />
          { points }
        </g>
      </svg>
    )
  }
});