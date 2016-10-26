var React = require('react');
var ZoomedMap = require('./zoomedmap.jsx');
var MiniMap = require('./minimap.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      dateMin: -Infinity,
      dateMax: Infinity
    };
  },
  setDates: function(object) {
    this.setState(object);
  },
  render: function() {
    var h1 = Math.floor(this.props.height * 0.9);
    var h2 = Math.floor(this.props.height * 0.2);
    return (
      <div id="zoomable">
        <ZoomedMap key="zoomedmap" data={ this.props.data }
          xaccessor={ this.props.xaccessor }
          yaccessor={ this.props.yaccessor }
          width={ this.props.width }
          height={ h1 }
          dateMin={ this.state.dateMin }
          dateMax={ this.state.dateMax } />
        <MiniMap key="minimap" data={ this.props.data }
          xaccessor={ this.props.xaccessor }
          yaccessor={ this.props.yaccessor }
          width={ this.props.width }
          height={ h2 }
          zoom={ this.setDates } />
      </div>
    )
  }
});