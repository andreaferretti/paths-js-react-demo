var React = require('react');
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');
var Prism = require('prismjs');
var Disclaimer = require('./disclaimer.jsx');
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
      var body = Prism.highlight(content, Prism.languages.javascript);
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
      var suffix = s.title.startsWith('data/') ? '.json' : '.jsx';

      return(
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title">{ s.title }{ suffix }</h2>
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

            <Row>
              <Col md={3} />
              <Col md={6}>{ this.props.children }</Col>
            </Row>
          </div>
        </div>
        { sources }
      </Col>
  )}
});