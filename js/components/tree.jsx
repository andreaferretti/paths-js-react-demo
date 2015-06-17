define([
  'react',
  'paths/tree',
  'json!data/ducks.json'
], function(React, Tree, ducks) {

  return React.createClass({

    render: function() {
      function children(x) {
        if(x.collapsed) {
          return []
        }
        else {
          return x.children
        }
      };

      var tree = Tree({
        data: ducks,
        children: this.children,
        width: 350,
        height: 300
      });

      var curves = tree.curves.map(function(c) {
        return <path d={ c.connector.path.print() } fill="none" stroke="gray" />
      })

      var nodes = tree.nodes.map(function(n) {
        var position = "translate(" + n.point[0] +"," + n.point[1]  +")";

        function toggle() {
          n.collapsed =  !n.collapsed;
          this.forceUpdate;
        };

        return (
          <g transform={ position }>
            <circle fill="white" stroke="black" r="5" cx="0" cy="0" onClick={ toggle }/>
            <text transform="translate(10,0)">{n.item.name}</text>
          </g>
        )
      })

      return <svg width="500" height="380">
        <g>
          { curves }
          { nodes }
        </g>
      </svg>
    }
  });
});