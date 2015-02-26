define([
  'react',
  'react-bootstrap/Row',
  './panel',
  './logo',
  './pie',
  './timeline',
  './dial',
  './drawing'
], function(React, Row, Panel, Logo, Pie, Timeline, Dial, Drawing) {
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
          <Row>
            <Panel title="Speed dial" text="We use a pie chart to track the mouse speed">
              <Dial />
            </Panel>
            <Panel title="Path animation" text="Integrate with Vivus to animate paths">
              <Drawing />
            </Panel>
          </Row>
        </div>
    )}
  });
});