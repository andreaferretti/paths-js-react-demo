"use strict";

define([
  'react',
  'paths/voronoi'],
  function(React, Voronoi){
    return React.createClass({

      cyclic: function(array, i){
        return array[i % array.length];
      },

      circleFill: function(i){
        return i===this.state.iOver ? "blue" : "red";
      },

      scale: function(iIn, iOut) {
        return function(x){
          return iOut[0] + (iOut[1] - iOut[0]) * (x - iIn[0]) / (iIn[1] - iIn[0]);
        }
      },

      addPoint: function(e){
        var ixscale=this.scale([0, this.props.width], this.props.xrange);
        var iyscale=this.scale([this.props.height, 0], this.props.yrange);
        var br=document.querySelector("#voronoi-svg").getBoundingClientRect();
        var newPoint=[ixscale(e.clientX-br.left), iyscale(e.clientY-br.top)];
        this.props.data[0]=newPoint;
        this.setState({iOver: 0});
      },

      getInitialState: function(){
        return {iOver: 0};
      },

      getDefaultProps: function(){
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
              return i==self.state.iOver ? "red" : self.cyclic(self.props.palette, i)
            },
            //patchAlpha: function(i){     CALLBACK 2
            //  return i===self.state.iOver ? 1 : 0.3;  CALLBACK 2
            //},   CALLBACK 2
          }
        });

        var curves = voronoi.curves.map(function(curve){
          return <path fill={curve.patchColor} fillOpacity="0.3" //{curve.patchAlpha} CALLBACK 2
                  //onMouseOver={function(event){               CALLBACK 1
                  //  self.setState({iOver: curve.index});}}    CALLBACK 1
                  d={curve.line.path.print()} stroke="black" strokeWidth="0.2"/>
        });
        var points = voronoi.nodes.map(function(node, i){
          return <circle cx={node.point[0]} cy={node.point[1]} r="3"
                  fill={self.circleFill(i)} fillOpacity="0.6"/>
        });
        return (
          <div id="voronoi">
            <svg width="500" height="380" id="voronoi-svg" onMouseOver={this.addPoint}>
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
