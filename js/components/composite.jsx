var React = require('react');
var Row = require('react-bootstrap/Row');
var Panel = require('./panel.jsx');
var Logo = require('./logo.jsx');
var Pie = require('./pie.jsx');
var Timeline = require('./timeline.jsx');
var Timeline2 = require('./timeline2.jsx');
var Dial = require('./dial.jsx');
var Drawing = require('./drawing.jsx');
var Tree = require('./tree.jsx');
var Bar = require('./bar.jsx');
var Stack = require('./stack.jsx');

module.exports = React.createClass({
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
          <Panel title="Tree" text="Here is a Tree Graph" sources={ ['components/tree'] }>
            <Tree />
          </Panel>
        </Row>
        <Row>
          <Panel title="Bar" text="Point over the bars to animate" sources={ ['components/bar'] }>
            <Bar data={[[1, 2, 3, 4], [3, 4, 5, 6], [4, 2, 3, 2]]}/>
          </Panel>
          <Panel title="Stack" text="Point over the bars to animate" sources={ ['components/stack'] }>
            <Stack data={[[1, 2, 3, 4], [3, 4, 5, 6], [4, 2, 3, 2]]} />
          </Panel>
        </Row>
      </div>
  )}
});