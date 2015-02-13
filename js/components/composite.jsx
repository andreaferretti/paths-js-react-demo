define([
  'react',
  'react-bootstrap/Row',
  './search',
  './list',
  './panel',
  './pie'
], function(React, Row, Search, List, Panel, Pie) {
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
      return (
        <div className="container">
          <Row>
            <Panel title="Filter list" text="Type to filter states">
              <Pie />
            </Panel>
          </Row>
        </div>
    )}
  });
});