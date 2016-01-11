define([
  'react',
  'animate',
  'paths/bar'],
  function(React, Animate, Bar){
    return React.createClass({

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

      handleMouseOver: function(index){
        this.animateState({data: this.scaledByIndex(index, 0.1)});
      },

      getInitialState: function(){
        return {data: this.props.data};
      },

      getDefaultProps: function(){
        return {
          width: 420,
          height: 350,
          gutter: 10,
          palette: ["LightCoral", "LemonChiffon", "LightSalmon",
                    "PaleGreen", "CornflowerBlue", "Thistle", "Lavender"]
        };
      },

      render: function(){

        var self = this;

        var bar = Bar({
          data: this.state.data,
          width: this.props.width,
          height: this.props.height,
          accessor: this.props.accessor,
          compute: {
            color: function(i){
              return self.props.palette[i % self.props.palette.length];
            }
          },
          gutter: this.props.gutter,
        });

        var curves = bar.curves.map(function(curve){
          return <path d={curve.line.path.print()} fill={curve.color}
          onMouseOver={function(event){self.handleMouseOver(curve.index);}}/>;
        });

        return (
          <div id="bar">
            <svg width="500" height="380">
              <g transform="translate(40, 10)">
                { curves }
              </g>
            </svg>
          </div>
        );
    },
  });
});
