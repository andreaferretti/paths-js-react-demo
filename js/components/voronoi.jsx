define([
  'react',
  '../charts/voronoi'],
  function(React, Voronoi){
    return React.createClass({

      cyclic: function(array, i){
        return array[i % array.length];
      },

      circleFill: function(i){
        return i===this.state.iOver ? "blue" : "red";
      },

      getInitialState: function(){
        return {iOver: null};
      },

      getDefaultProps: function(){
        return {
          width: 500,
          heigth: 380,
          palette: ["LightCoral", "NavajoWhite", "LemonChiffon", "PaleGreen",
                  "CornflowerBlue", "Thistle", "Lavender", "#FFB347", "#A05FAB",
                  "#E7D6B6", "#DE9AA4", "#AFCFAA", "#B3AF9C", "#C1C5C0","#1b85b8",
                  "#ae5a41", "#c3cb71", "#FFD1DC", "#AEC6CF", "#E7D943", "#A3E743",
                  "#FDFD96", "#836953", "#779ECB", "#D5B13B", "#66A0A5", "#E4DE12",
                  "#B94BE4",  "#F2DE9C", "#3BBDD1", "#A3E8F3", "#ffff00"]}
      },

      render: function(){
        var self=this;

        var voronoi = Voronoi({
          data: this.props.data,
          accessor: this.props.accessor,
          width: this.props.width,
          height:this.props.height,
          xrange: this.props.xrange,
          yrange: this.props.yrange,
          compute: {
            patchColor: function(i){
              return self.cyclic(self.props.palette, i);
            },
            //patchAlpha: function(i){
            //  return i===self.state.iOver ? 1 : 0.3;
            //},
          }
        });

        var curves = voronoi.curves.map(function(curve){
          return <path d={curve.line.path.print()} stroke="black" strokeWidth="0.2"
                   fill={curve.patchColor} fillOpacity="0.3" //{curve.patchAlpha}
                  onMouseOver={function(event){
                    self.setState({iOver: curve.index});}}/>
        });
        var points = voronoi.nodes.map(function(node, i){
          return <circle cx={node.point[0]} cy={node.point[1]} r="3"
                  fill={self.circleFill(i)} fillOpacity="0.6"/>
        });
        return (
          <div id="voronoi">
            <svg width="500" height="380">
              <g transform="translate(0, 0)">
                {curves}
                {points}
              </g>
            </svg>
          </div>
        )
      }
    });
  }
)
