define([
  'react',
  'react-bootstrap/Row',
  'react-bootstrap/Col'
], function(React, Row, Col) {
  return React.createClass({
    render: function() {
      return (
        <Row>
          <Col md={6}>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h2 className="panel-title">{ this.props.title }</h2>
                <span className="links">
                  <a>Source</a>
                </span>
              </div>

              <div className="panel-body">
                <p className="alert alert-info">{ this.props.text }</p>

                { this.props.children }
              </div>
            </div>
          </Col>
        </Row>
    )}
  });
});