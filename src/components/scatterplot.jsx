var React = require('react');
var Stock = require('paths-js/stock');
var episodes = require('../data/twin-peaks.json');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      hover: null
    };
  },

  exit: function() {
    this.setState({ hover: null });
  },

  render: function() {
    var scatterplot = Stock({
      data: [episodes],
      xaccessor: function(t) { return t.episode },
      yaccessor: function(t) { return t.rating },
      width: 460,
      height: 350,
      closed: false
    });
    var self = this;
    var dots = scatterplot.curves[0].line.path.points().map(function(p, i) {
      var translate = 'translate(' + p[0] + ',' + p[1]  + ')';
      function hover() {
        self.setState({ hover: i });
      }
      var fill = (i === self.state.hover) ? 'lightgrey': 'white';
      var anchor = (i < episodes.length / 2) ? 'start' : 'end';
      var transform = (i < episodes.length / 2) ? 'translate(15,5)' : 'translate(-15,5)';
      var text = (i === self.state.hover) ?
        <text textAnchor={ anchor } transform={ transform }>{ episodes[i].title }</text> :
        null;

      return <g transform={ translate }>
        <circle r={5} cx={0} cy={0} stroke='#3E90F0' fill={ fill } onMouseEnter={ hover } onMouseLeave={ self.exit }/>
        { text }
      </g>;
    });
    var xscale = scatterplot.xscale;
    var yscale = scatterplot.yscale;
    var ydots = [8, 8.5, 9, 9.5].map(function(t) {
      var translate = 'translate(' + xscale(0) + ',' + yscale(t)  + ')';
      return <g transform={ translate }>
      	<circle r={2} cx={0} cy={0} stroke='grey' fill='grey' />
      	<text transform='translate(5, 5)' text-anchor='start'>{ t }</text>
		  </g>;
    });

    return (
      <svg className='scatterplot' width={500} height={400}>
        <g transform="translate(20, 30)">
          { dots }
          <line x1={ xscale(0) } y1={ yscale(9.6) } x2={ xscale(0) } y2={ yscale(7.9) } stroke='grey' fill='none' />
          <line x1={ xscale(-0.5) } y1={ yscale(7.95) } x2={ xscale(33) } y2={ yscale(7.95) } stroke='grey' fill='none' />
          { ydots }
        </g>
      </svg>
    );
  }
});