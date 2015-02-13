define([
  'react',
  'react-bootstrap/Row',
  'react-bootstrap/Col',
  './search',
  './list'
], function(React, Row, Col, Search, List) {
  var countries = [
    { name: 'Italy', population: 59859996 },
    { name: 'Mexico', population: 118395054 },
    { name: 'France', population: 65806000 },
    { name: 'Argentina', population: 40117096 },
    { name: 'Japan', population: 127290000 }
  ];

  return React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
      return {
        value: ''
      };
    },
    render: function() {
      return <div className="container">
        <Row>
          <Col md={4}>
            <Search valueLink={ this.linkState("value") } />
            <List data={ countries } query={ this.state.value } />
          </Col>
        </Row>
      </div>;
    }
  });
});