var React = require('react');
var Colors = require('../palette/colors.jsx');
var Pie = require('../charts/pie.jsx');

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

function population(c) { return c.population; }

module.exports = React.createClass({
  render: function() {
    return <Pie data={ countries } palette={ palette } r={ 60 } R={ 140 } accessor={ population } />
  }
});