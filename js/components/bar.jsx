var React = require('react');
var Animate = require('../animate.jsx');
var Colors = require('../palette/colors.jsx');
var Bar = require('paths-js/bar');

module.exports = React.createClass({

  mixins: [Animate.Mixin],

  scaledByIndex: function(index, scale, matrix) {
    if (index===undefined)
      return matrix;
    var scale = scale || 0;
    var matrix = matrix || this.props.data;
    return matrix.map(function(array, i){
      return array.map(function(value){
        return (i==index) ? value : value*scale;
      });
    });
  },

  handleMouseOver: function(index) {
    this.animateState({data: this.scaledByIndex(index, 0.1)});
  },

  handleMouseLeave: function() {
    this.animateState({data: this.props.data});
  },

  getInitialState: function() {
    return {data: this.props.data};
  },

  getDefaultProps: function() {
    return {
      width: 420,
      height: 350,
      gutter: 10,
      palette: Colors.mix({
          r: 130,
          g: 140,
          b: 210
        }, {
          r: 180,
          g: 205,
          b: 150
        })
    };
  },

  render: function() {

    var self = this;

    var bar = Bar({
      data: this.state.data,
      width: this.props.width,
      height: this.props.height,
      accessor: this.props.accessor,
      compute: {
        color: function(i) {
          return Colors.string(self.props.palette[i % self.props.palette.length]);
        }
      },
      gutter: this.props.gutter,
      offset: [40, 10]
    });

    var curves = bar.curves.map(function(curve){
      return <path d={curve.line.path.print()} fill={curve.color}
      onMouseOver={function(event){self.handleMouseOver(curve.index)}}
      onMouseLeave={self.handleMouseLeave}/>;
    });

    return (
      <div id="bar">
        <svg width="500" height="380">
          { curves }
        </svg>
      </div>
    );
  }
});