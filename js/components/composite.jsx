var React = require('react');
var Row = require('react-bootstrap/Row');
var Button = require('react-bootstrap/Button');
var ButtonGroup = require('react-bootstrap/ButtonGroup');
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
var Voronoi = require('./voronoi.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      select: 0
    };
  },

  select: function(i) {
    this.setState({select: i});
  },

  components: [
    <Panel title="Pie Chart" key="pie" text="Here is a pie chart example. Sectors are clickable" sources={ ['components/pie', 'charts/pie'] }>
      <Pie />
    </Panel>,
    <Panel title="Path animation"
      key="path-animation"
      text={ <span>Integrate with <a href="http://maxwellito.github.io/vivus/" target="_blank">Vivus</a> to animate paths</span> }
      sources={ ['components/drawing'] }>
      <Drawing />
    </Panel>,
    <Panel key="line" title="Line Chart" text="Here is a zoomable timeline" sources={ ['components/timeline', 'charts/timeline'] }>
      <Timeline />
    </Panel>,
    <Panel
      key="zoomable"
      title="Zoomable timeline" text="Use the minimap to zoom the timeline"
      sources={ ['components/timeline2', 'charts/zoomable', 'charts/zoomedmap', 'charts/minimap'] }>
      <Timeline2 />
    </Panel>,
    <Panel key="speed-dial" title="Speed dial" text="We use a pie chart to track the mouse speed" sources={ ['components/dial'] }>
      <Dial />
    </Panel>,
    <Panel key="tree" title="Tree" text="Here is a Tree Graph" sources={ ['components/tree'] }>
      <Tree />
    </Panel>,
    <Panel key="bar" title="Bar" text="Point over the bars to animate" sources={ ['components/bar'] }>
      <Bar data={[[1, 2, 3, 4], [3, 4, 5, 6], [4, 2, 3, 2]]}/>
    </Panel>,
    <Panel key="stack" title="Stack" text="Point over the bars to animate" sources={ ['components/stack'] }>
      <Stack data={[[1, 2, 3, 4], [3, 4, 5, 6], [4, 2, 3, 2]]} />
    </Panel>,
    <Panel key="voronoi" title="Voronoi" text="Move the mouse over the diagram to add a point"
      sources={ ['components/voronoi', 'charts/voronoi'] }>
      <Voronoi />
    </Panel>
  ],

  render: function() {
    var n = this.state.select % this.components.length;
    var self = this;
    var selectors = this.components.map(function(c, i) {
      var active = i == self.state.select;
      var bsStyle = active ? "primary" : "default";
      return <Button
        key={ i }
        onClick={ self.select.bind(self, i) }
        active={ active }
        bsStyle={ bsStyle }>{ c.props.title }</Button>;
    });

    return (
      <div className="container">
        <Row>
          <Logo />
        </Row>
        <Row>
          <div className="center-wrap">
            <ButtonGroup className="center">{ selectors }</ButtonGroup>
          </div>
        </Row>
        <Row>
          { this.components[n] }
        </Row>
      </div>
  )}
});