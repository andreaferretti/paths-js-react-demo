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
var Graph = require('./graph.jsx');
var Sankey = require('./sankey.jsx');
var Waterfall = require('./waterfall.jsx');
var Radar = require('./radar.jsx');
var Scatterplot = require('./scatterplot.jsx');
var Disclaimer = require('./disclaimer.jsx');

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
    <Panel key="tree" title="Tree" text="Here is a Tree Graph" sources={ ['components/tree', 'data/ducks'] }>
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
    </Panel>,
    <Panel key="graph" title="Graph" text="Here is a preliminary example of force-directed graph"
      sources={ ['components/graph'] }>
      <Graph />
    </Panel>,
    <Panel key="sankey" title="Sankey diagram" text="Sankey diagrams are typically used to visualize energy or material or cost transfers between processes"
      sources={ ['components/sankey', 'data/sankey'] }>
      <Sankey />
    </Panel>,
    <Panel key="waterfall" title="Waterfall diagram" text="A breakdown of incomes and costs for each month"
      sources={ ['components/waterfall', 'data/waterfall'] }>
      <Waterfall />
    </Panel>,
    <Panel key="radar" title="Radar chart" text="Here is a radar chart showing Pokémon stats. Try changing Pokémon"
      sources={ ['components/radar', 'data/pokemon'] }>
      <Radar />
    </Panel>,
    <Panel key="scatterplot" title="Scatterplot" text="The stock chart can also be used to plot scattered data. Here are rating data for the Twin Peaks episodes."
      sources={ ['components/scatterplot', 'data/twin-peaks'] }>
      <Scatterplot />
    </Panel>
  ],

  render: function() {
    var n = this.state.select % this.components.length;
    var self = this;
    var selectors = this.components.map(function(c, i) {
      var active = i == self.state.select;
      var bsStyle = active ? "primary" : "default";
      var src = "images/" + c.props.title + ".png";
      return <div key={ i } onClick={ self.select.bind(self, i) } className="selector">
        <img src={ src } alt={ c.props.title } height={ 70 } />
        <p>{ c.props.title }</p>
      </div>;
    });

    return (
      <div className="container">
        <Row>
          <Logo />
        </Row>
        <Row>
          <div className="center-wrap">
            <div className="center">{ selectors }</div>
          </div>
          <Disclaimer />
        </Row>
        <Row>
          { this.components[n] }
        </Row>
      </div>
  )}
});