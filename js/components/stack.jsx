define([
  'react',
  '../charts/stack'],
  function(React, Stack){
    return React.createClass({

      cardinal: function(num){
        if(num == 1)
          return "st";
        else if(num == 2)
          return "nd";
        else if(num == 3)
          return "rd";
        else
          return "th";
      },

      cyclic: function(array, i){
        return array[i % array.length];
      },

      handleMouseOver: function(barX, curves){
        var ifCentroidX = function(curve){
          return curve.line.centroid[0] === barX;
        };
        var toTextInfo = function(curve){
          return {
            x: barX,
            y: curve.line.centroid[1],
            value: curve.item,
            index: curve.index
          }
        };
        this.setState({text: curves.filter(ifCentroidX).map(toTextInfo)});
      },

      handleMouseLeave: function(event){
        this.setState({text: []});
      },

      getDefaultProps: function(){
        return {
          width: 420,
          height: 350,
          palette: ["LightCoral", "NavajoWhite", "LemonChiffon",
                    "PaleGreen", "CornflowerBlue", "Thistle", "Lavender"]
        };
      },

      getInitialState: function(){
        return {text: []};
      },

      render: function(){

        var self = this;

        var stack = Stack({
          data: this.props.data,
          accessor: this.props.accessor,
          width: this.props.width,
          height:this.props.height,
          gutter: this.props.gutter,
          compute: {
            color: function(i){
              return self.cyclic(self.props.palette, i);
            }
          }
        });

        var curves = stack.curves.map(function(curve){
          return <path d={curve.line.path.print()} fill={curve.color}
                  onMouseOver={function(event){
                    self.handleMouseOver(curve.line.centroid[0], stack.curves)}
                  }
                  onMouseLeave={self.handleMouseLeave}/>;
          });

        var text = this.state.text.map(function(textInfo){
          //sembra che React non supporti l'attributo alignmentBaseline
          return <text x={textInfo.x} y={textInfo.y} alignmentBaseline="middle"
                  fontFamily="Serif" textAnchor="middle"
                  fontSize={self.props.fontSize || self.props.height / 20}>
                  { (textInfo.index+1) + self.cardinal(textInfo.index+1) +
                  " serie: " + textInfo.value }</text>;
          });

        return (
          <div id="stack">
            <svg width="500" height="380">
              <g transform="translate(40, 10)">
              {curves}
              {text}
              </g>
            </svg>
          </div>
        );
      },
    });
  }
)
