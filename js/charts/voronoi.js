var React = require('react')
var Linear = require('paths-js/linear')
var Voronoi = require('paths-js/voronoi')

function cyclic(array, i) {
  return array[i % array.length];
}

module.exports = React.createClass({
  circleFill: function(i) {
    return (i === 0) ? "blue" : "red";
  },

  addPoint: function(e) {
    var ixscale = Linear([0, this.props.width], this.props.xrange);
    var iyscale = Linear([this.props.height, 0], this.props.yrange);
    var br=document.querySelector("#voronoi-svg").getBoundingClientRect();

    this.setState({
      mouse: [
        ixscale(e.clientX-br.left),
        iyscale(e.clientY-br.top)
      ]
    });
  },

  getInitialState: function() {
    return {
      mouse: null
    };
  },

  getDefaultProps: function() {
    return {
      width: 500,
      height: 380,
      xrange: [-1,1],
      yrange: [-1,1],
      palette: ["LightCoral", "NavajoWhite", "LemonChiffon", "PaleGreen",
        "CornflowerBlue", "Thistle", "Lavender", "#FFB347", "#A05FAB",
        "#E7D6B6", "#DE9AA4", "#AFCFAA", "#B3AF9C", "#C1C5C0","#1b85b8",
        "#ae5a41", "#c3cb71", "#FFD1DC", "#AEC6CF", "#E7D943", "#A3E743",
        "#FDFD96", "#836953", "#779ECB", "#D5B13B", "#66A0A5", "#E4DE12",
        "#B94BE4",  "#F2DE9C", "#3BBDD1", "#A3E8F3", "#ffff00"]
    };
  },

  render: function() {
    var self = this;
    var points = (this.state.mouse) ?
      [this.state.mouse].concat(this.props.data) : this.props.data;

    var voronoi = Voronoi({
      data: points,
      width: this.props.width,
      height:this.props.height,
      xrange: this.props.xrange,
      yrange: this.props.yrange,
      compute: {
        patchColor: function(i) {
          return (i === 0) ? "red" : cyclic(self.props.palette, i);
        }
      }
    });

    var curves = voronoi.curves.map(function(curve) {
      return <path fill={curve.patchColor} fillOpacity="0.3"
        d={curve.line.path.print()} stroke="grey" strokeWidth="0.2"/>
    });
    var points = voronoi.nodes.map(function(node, i) {
      return <circle cx={node.point[0]} cy={node.point[1]}
        r="3" fill={self.circleFill(i)} />
    });
    return (
      <div id="voronoi">
        <svg width="500" height="380" id="voronoi-svg" onMouseOver={this.addPoint}>
          <g>
            {curves}
            {points}
          </g>
        </svg>
      </div>
    )
  }
})