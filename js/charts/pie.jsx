var React = require('react');
var Animate = require('../animate.jsx');
var Colors = require('../palette/colors.jsx');
var Pie = require('paths-js/pie');
var _ = require('lodash');

function cyclic(coll, i) { return coll[i % coll.length]; }
function identity(x) { return x }

module.exports = React.createClass({
  mixins: [Animate.Mixin],

  getInitialState: function() {
    return { expanded: [0, 0, 0, 0, 0] };
  },

  translate: function(p) { return "translate(" + p[0] + "," + p[1] + ")" },

  move: function(point, perc) {
    return this.translate([point[0] * perc / 3, point[1] * perc / 3]);
  },

  grad: function(i) { return "grad-" + i },

  fill: function(i) { return "url(#grad-" + i  +")" },

  color: function(i) { return Colors.string(cyclic(this.props.palette, i)); },

  lighten: function(i) { return Colors.string(Colors.lighten(cyclic(this.props.palette, i))); },

  expand: function(i) {
    var self = this;
    return function() {
      var target = [0, 0, 0, 0, 0];
      target[i] = 1;
      self.animateState({ expanded: target });
    };
  },

  render: function() {
    var chart = Pie({
      center: this.props.center || [0,0],
      r: this.props.r || 60,
      R: this.props.R || 140,
      data: this.props.data,
      accessor: this.props.accessor || identity
    });
    var self = this;
    var coefficients = this.state.expanded;
    var slices = chart.curves.map(function(c, i) {
      return (
        <g key={ i } transform={ self.move(c.sector.centroid, coefficients[i]) }>
          <linearGradient id={ self.grad(i) }>
            <stop stopColor={ self.color(i) } offset="0%"/>
            <stop stopColor={ self.lighten(i) } offset="100%"/>
          </linearGradient>
          <path onClick={ self.expand(i) } d={ c.sector.path.print() } fill={ self.fill(i) } />
          <text textAnchor="middle" transform={ self.translate(c.sector.centroid) }>{ c.item.name }</text>
        </g>
      )
    });
    var selected = _.find(this.props.data, function(c, i) {
      return coefficients[i] === 1;
    });
    var table = selected ?
      <div className="country-info">
        <h4>{ selected.name }</h4>
        <p>Population: <span className="label label-info">{ selected.population }</span></p>
      </div> : null

    return(
      <div id="pie">
        <svg width="375" height="400">
          <g transform="translate(200, 200)">{ slices }</g>
        </svg>

        { table }
      </div>
  )}
});