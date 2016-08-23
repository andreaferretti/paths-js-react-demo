var React = require('react');
var Input = require('react-bootstrap/Input');
var Radar = require('paths-js/radar');
var Colors = require('../palette/colors.jsx');
var util = require('../palette/util.jsx');
var Animate = require('../animate.jsx');
var data = require('../data/pokemon.json');

function keyAccessor(keys) {
  var a = {};
  keys.forEach(function(key) {
    a[key] = function(obj) { return obj[key]; }
  });
  return a;
}

var labels = ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
var palette = Colors.mix({r: 130, g: 140, b: 210}, {r: 180, g: 205, b: 150});
var colors = util.palette_to_function(palette);

module.exports = React.createClass({
  mixins: [Animate.Mixin],
  getInitialState: function() {
    return {
      pokemon: data[0],
      color: palette[0]
    };
  },
  select: function(e) {
    this.animateState({
      pokemon: data[e.target.value],
      color: palette[e.target.value]
    });
  },
  render: function() {
    var radar = Radar({
      data: [this.state.pokemon],
      accessor: keyAccessor(labels),
      center: [0, 0],
      r: 130,
      max: 100
    });
    var color = this.state.color;
    var rings = radar.rings.map(function(r, i) {
      if (i == 2) {
        var lines = r.path.points().map(function(p, j) {
          var x = p[0];
          var y = p[1];
          var transform = 'translate(' + Math.floor(1.2 * x) + ',' + Math.floor(1.2 * y) + ')';
          return <g>
            <text textAnchor="middle" transform={ transform }>{ labels[j] }</text>
            <line x1={ x } y1={ y } x2={ 0 } y2={ 0 } stroke="gray" />
          </g>
        });
        return <g>{ lines }</g>
      } else {
        return <path d={ r.path.print() } fill="none" stroke="gray" />
      }
    });
    var poly = radar.curves.map(function(c) {
      return <path d={ c.polygon.path.print() }
        fill={ Colors.string(Colors.lighten(color)) } stroke={ Colors.string(color) } />
    });
    var options = data.map(function(p, i) {
      return <option value={ i }>{ p.name }</option>
    });

    return (
      <div className="radar">
        <Input type="select" onChange={ this.select }>
          { options }
        </Input>
        <div className="pokemon-info">
          <h4>{ this.state.pokemon.name }</h4>
          <p>HP: <span className="label label-info">{ Math.floor(this.state.pokemon.hp) }</span></p>
          <p>Attack: <span className="label label-info">{ Math.floor(this.state.pokemon.attack) }</span></p>
          <p>Defense: <span className="label label-info">{ Math.floor(this.state.pokemon.defense) }</span></p>
          <p>Sp. Attack: <span className="label label-info">{ Math.floor(this.state.pokemon.sp_attack) }</span></p>
          <p>Sp. Defense: <span className="label label-info">{ Math.floor(this.state.pokemon.sp_defense) }</span></p>
          <p>Speed: <span className="label label-info">{ Math.floor(this.state.pokemon.speed) }</span></p>
        </div>
        <svg width={ 375 } height={ 400 }>
          <g transform="translate(200, 200)">
            { rings }
            { poly }
          </g>
        </svg>
      </div>
    );
  }
});