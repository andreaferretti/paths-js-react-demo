var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Modal = require('react-bootstrap/lib/Modal');
var hljs = require('highlight.js');
var github = require('../github.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      modal: false,
      content: '',
      title: ''
    };
  },
  show: function(s) {
    var self = this;
    return function() {
      github(s).then(function(content) {
        var body = hljs.highlight('javascript', content).value;
        self.setState({ modal: true, content: body, title: s });
      });
    }
  },
  hide: function() {
    this.setState({ modal: false });
  },
  modal: function() {
    return (
      <Modal.Dialog onHide={ this.hide }>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre dangerouslySetInnerHTML={{__html: this.state.content}} />
        </Modal.Body>
      </Modal.Dialog>
  )},
  render: function() {
    var modal = this.state.modal ? this.modal() : null;
    var single = this.props.sources.length <= 1;
    var self = this;
    var links = this.props.sources.map(function (s, i) {
      var text = single ? 'Source': 'Source ' + (i + 1);

      return <a onClick={ self.show(s) }>{ text }</a>
    });

    return (
      <Col md={6}>
        { modal }
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title">{ this.props.title }</h2>

            <span className="links">{ links }</span>
          </div>

          <div className="panel-body">
            <p className="alert alert-info">{ this.props.text }</p>

            { this.props.children }
          </div>
        </div>
      </Col>
  )}
});
