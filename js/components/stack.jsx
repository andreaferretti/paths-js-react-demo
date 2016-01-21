var React = require('react');
var Animate = require('../animate.jsx');
var Colors = require('../palette/colors.jsx');
var Stack = require('paths-js/stack');

module.exports = React.createClass({

  mixins: [Animate.Mixin],

  cyclic: function(array, i) {
    return array[i % array.length];
  },

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

  handleMouseOver: function(index){
    this.animateState({data: this.scaledByIndex(index, 0.1)});
  },

  handleMouseLeave: function(){
    this.animateState({data: this.props.data});
  },

  getInitialState: function(){
    return {data: this.props.data};
  },

  getDefaultProps: function() {
    return {
      width: 420,
      height: 350,
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

    var stack = Stack({
      data: this.state.data,
      accessor: this.props.accessor,
      width: this.props.width,
      height:this.props.height,
      gutter: this.props.gutter,
      compute: {
        color: function(index, item, group){
          return Colors.string(self.cyclic(self.props.palette, group));
        }
      }
    });

    var curves = stack.curves.map(function(curve){
      return <path d={curve.line.path.print()} fill={curve.color}
              onMouseOver={function(event){self.handleMouseOver(curve.group)}}
              onMouseLeave={self.handleMouseLeave}/>;
      });

    return (
      <div id="stack">
        <svg width="500" height="380">
          <g transform="translate(40, 10)">
          {curves}
          </g>
        </svg>
      </div>
    );
  }
});