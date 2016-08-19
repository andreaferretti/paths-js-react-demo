var React = require('react');
var Input = require('react-bootstrap/Input');
var Waterfall = require('paths-js/waterfall');
var Animate = require('../animate.jsx');
var data = require('../data/waterfall.json');

function translate(curve) {
  return 'translate(' + curve.centroid[0] + ',370)';
}
function color(item) {
  return item.absolute ? '#acd1e9' : '#fa6078';
}

module.exports = React.createClass({
  mixins: [Animate.Mixin],
  getInitialState: function() {
    return { data: data[0] };
  },
  select: function(e) {
    this.animateState({ data: data[e.target.value] });
  },
  render: function() {
    var waterfall = Waterfall({
      data: this.state.data,
      min: 0,
      max: 40,
      width: 460,
      height: 350,
      gutter: 10
    });
    var rectangles = waterfall.curves.map(function(c) {
      return <g>
        <path d={ c.line.path.print() } stroke="none" fill={ color(c.item) } />
        <text transform={ translate(c.line) } textAnchor="middle" style={{ fontSize: 11 }}>{ c.item.name }</text>
      </g>
    });

    return (
      <div>
        <Input type="select" onChange={ this.select }>
          <option value={ 0 }>January</option>
          <option value={ 1 }>February</option>
          <option value={ 2 }>March</option>
        </Input>
        <svg width={ 500 } height={ 440 }>
          <g transform="translate(20, 30)">
            { rectangles }
          </g>
        </svg>
      </div>
    );
  }
});