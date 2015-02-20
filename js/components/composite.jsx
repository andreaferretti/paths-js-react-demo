define([
  'react',
  'react-bootstrap/Row',
  './panel',
  './logo',
  './pie',
  './timeline'
], function(React, Row, Panel, Logo, Pie, Timeline) {
  return React.createClass({
    render: function() {
      return (
        <div className="container">
          <Row>
            <Logo />
          </Row>
          <Row>
            <Panel title="Pie Chart" text="Here is a pie chart example. Sectors are clickable">
              <Pie />
            </Panel>
            <Panel title="Line Chart" text="Here is a zoomable timeline">
              <Timeline />
            </Panel>
          </Row>
        </div>
    )}
  });
});