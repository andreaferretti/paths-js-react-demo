var React = require('react');
var Col = require('react-bootstrap/Col');
var hljs = require('highlight.js');
var github = require('../github.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      sources: []
    };
  },
  loadSource: function(s) {
    var self = this;
    github(s).then(function(content) {
      var body = hljs.highlight('javascript', content).value;
      var sources = self.state.sources;
      sources.push({
        body: body,
        title: s
      });
      self.setState({ sources: sources });
    });
  },
  loadSources: function(sources) {
    sources.forEach(this.loadSource);
  },
  componentWillMount: function() {
    this.loadSources(this.props.sources);
  },
  componentWillReceiveProps: function(props) {
    this.loadSources(props.sources);
  },
  render: function() {
    var sources = this.state.sources.map(function (s) {
      return(
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title">{ s.title }.jsx</h2>
          </div>

          <div className="panel-body">
            <pre dangerouslySetInnerHTML={{__html: s.body }} />
          </div>
        </div>
      );
    });

    return (
      <Col md={12} className="chart-panel">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title">{ this.props.title }</h2>
          </div>

          <div className="panel-body">
            <p className="alert alert-info">{ this.props.text }</p>

            { this.props.children }
          </div>
        </div>
        { sources }
      </Col>
  )}
});