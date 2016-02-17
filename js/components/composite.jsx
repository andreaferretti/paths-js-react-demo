define([
  'react',
  'react-bootstrap/Row',
  './panel',
  './logo',
  './pie',
  './timeline',
  './timeline2',
  './dial',
  './drawing',
  './tree',
  'json!data/nestedArray.json',
  './bar',
  './stack',
  './voronoi'
], function(React, Row, Panel, Logo, Pie, Timeline, Timeline2, Dial, Drawing, Tree, barData, Bar, Stack, Voronoi) {
  return React.createClass({
    render: function() {
      var random = [];
      for (var i=0; i<70; i++) {
        random.push([2*(Math.random() - 0.5), 2*(Math.random() - 0.5)]);
      };
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
            <Panel title="Bar" text="Here is a Bar Chart" sources={ ['components/bar'] }>
              <Bar data={[[1,2],[3,4]]}/>
            </Panel>
            <Panel title="Stack" text="Here is a Stack Chart" sources={ ['components/stack'] }>
              <Stack data={[[2, 4],[3, 4, 5], [8]]} />
            </Panel>
          </Row>
          <Row>
            <Panel title="Voronoi" text="Here is a Voronoi Chart" sources={ ['components/voronoi'] }>
              <Voronoi data={random}  />
            </Panel>
          </Row>
        </div>
    )}
  });
});
