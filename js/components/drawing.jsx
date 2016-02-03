var React = require('react');
var Vivus = require('vivus');
var SmoothLine = require('paths-js/smooth-line');
var stock = require('../data/stock.json');

function parseDate(str) {
  var split = str.split(' ');
  var month = split[0];
  var year = split[1];
  var months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  };
  var m = months[month];
  var d = new Date();
  d.setMonth(m);
  d.setYear(parseInt(year, 10) - 1900);
  return d.getTime();
}

module.exports = React.createClass({
  getInitialState: function() {
    return { showAreas: false };
  },
  componentDidMount: function() {
    new Vivus(this.refs.vivus.getDOMNode(), {
      type: 'delayed',
      duration: 200,
      start: 'autostart',
      selfDestroy: true
    }, this.addAreas);
  },
  addAreas: function() {
    this.setState({ showAreas: true });
  },
  render: function() {
    var names = ["AAPL", "AMZN", "IBM"];
    var palette = ["#3E90F0", "#7881C2", "#707B82"];
    var chart = SmoothLine({
      data: [stock.AAPL, stock.AMZN, stock.IBM],
      xaccessor: function(d) { return parseDate(d.date); },
      yaccessor: function(d) { return d.value; },
      width: 450,
      height: 350,
      closed: false
    });
    var lines = chart.curves.map(function(c, i) {
      return <path d={ c.line.path.print() } stroke={ palette[i] } fill="none" />
    });
    var areas = chart.curves.map(function(c, i) {
      var transparent = { opacity: 0.5 };
      return <path d={ c.area.path.print() } style={ transparent } stroke="none" fill={ palette[i] } />
    });
    var legends = chart.curves.map(function(c, i) {
      var translate = "translate(0," + (30 * i) + ")";
      return <g transform={translate}>
          <rect width={20} height={20} style={{fill: palette[i]}} />
          <text transform="translate(30, 15)" fontSize={12}>{ names[i] }</text>
        </g>;
    });
    return <svg ref="vivus" width="500" height="400">
      <g transform="translate(30, 0)">
        { this.state.showAreas ? areas : null }
        { lines }
      </g>
      <g transform="translate(60, 70)">
        { this.state.showAreas ? legends : null }
      </g>
    </svg>
  }
});