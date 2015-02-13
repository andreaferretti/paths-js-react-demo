define([
  'react',
  'tween',
  'palette/colors',
  'palette/util',
  'paths/pie',
], function(React, Tween, Colors, util, Pie) {
  var countries = [
    { name: 'Italy', population: 59859996 },
    { name: 'Mexico', population: 118395054 },
    { name: 'France', population: 65806000 },
    { name: 'Argentina', population: 40117096 },
    { name: 'Japan', population: 127290000 }
  ];

  var palette = Colors.mix({
    r: 130,
    g: 140,
    b: 210
  }, {
    r: 180,
    g: 205,
    b: 150
  });

  var colors = util.palette_to_function(palette);

  return React.createClass({
    mixins: [Tween.Mixin],

    getInitialState: function() {
      return {
        expanded: [0, 0, 0, 0, 0]
      }
    },

    translate: function(p) {
      return "translate(" + p[0] + "," + p[1] + ")"
    },

    move: function(point, perc) {
      return this.translate([point[0] * perc / 3, point[1] * perc / 3]);
    },

    grad: function(i) { return "grad-" + i },

    fill: function(i) { return "url(#grad-" + i  +")" },

    color: function(i) { return Colors.string(colors(i)); },

    lighten: function(i) { return Colors.string(Colors.lighten(colors(i))); },

    expand: function(i) {
      var self = this;
      return function() {
        var target = [0, 0, 0, 0, 0];
        target[i] = 1;
        self.tweenState({expanded: target });
      };
    },

    render: function() {
      var chart = Pie({
        center: [0, 0],
        r: 60,
        R: 140,
        data: countries,
        accessor: function(x) { return x.population; }
      });
      var self = this;
      var coefficients = this.state.expanded;
      console.log(coefficients);
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
      var selected = _.find(countries, function(c, i) {
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
});