define([
  'react',
  'react-bootstrap/Row',
  './search',
  './list',
  './panel',
  './pie'
], function(React, Row, Search, List, Panel, Pie) {
  return React.createClass({
    render: function() {
      return (
        <div className="container">
          <Row>
            <Panel title="Pie Chart" text="Here is a pie chart example. Sectors are clickable">
              <Pie />
            </Panel>
          </Row>
        </div>
    )}
  });
});