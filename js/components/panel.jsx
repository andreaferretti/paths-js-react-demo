define([
  'react',
  'react-bootstrap/Col'
], function(React, Col) {
  return React.createClass({
    render: function() {
      return (
        <Col md={6}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title">{ this.props.title }</h2>
            </div>

            <div className="panel-body">
              <p className="alert alert-info">{ this.props.text }</p>

              { this.props.children }
            </div>
          </div>
        </Col>
    )}
  });
});