define([
  'react',
  'react-bootstrap/Row',
  './panel',
  './logo',
  './pie',
  './timeline',
  './timeline2',
  './dial',
  './drawing'
], function(React, Row, Panel, Logo, Pie, Timeline, Timeline2, Dial, Drawing) {
  return React.createClass({
    render: function() {
      return (
        <div className="container">
          <Row>
            <Logo />
          </Row>
          <Row>
            <Panel title="Pie Chart" text="Here is a pie chart example. Sectors are clickable" sources={ ['components/pie', 'charts/pie'] }>
              <Pie />
            </Panel>
            <Panel title="Path animation"
              text={ <span>Integrate with <a href="http://maxwellito.github.io/vivus/" target="_blank">Vivus</a> to animate paths</span> }
              sources={ ['components/drawing'] }>
              <Drawing />
            </Panel>
          </Row>
          <Row>
            <Panel title="Line Chart" text="Here is a zoomable timeline" sources={ ['components/timeline', 'charts/timeline'] }>
              <Timeline />
            </Panel>
            <Panel title="Zoomable timeline" text="Use the minimap to zoom the timeline"
              sources={ ['components/timeline2', 'charts/zoomable', 'charts/zoomedmap', 'charts/minimap'] }>
              <Timeline2 />
            </Panel>
          </Row>
          <Row>
            <Panel title="Speed dial" text="We use a pie chart to track the mouse speed" sources={ ['components/dial'] }>
              <Dial />
            </Panel>
          </Row>
        </div>
    )}
  });
});