var React = require('react');
var Animate = require('../animate.jsx');

module.exports = React.createClass({
  mixins: [Animate.Mixin],

  componentWillMount: function() {
    setTimeout(this.fadeOut, 15000);
  },

  getInitialState: function() {
    return {
      visible: true,
      opacity: 1
    };
  },

  fadeOut: function() {
    this.animateState(
      { opacity: 0 },
      {
        duration: 2000,
        done: this.disappear
      }
    );
  },

  disappear: function() {
    this.setState({ visible: false });
  },

  render: function() {
    return this.state.visible ? (
      <div className="alert alert-success disclaimer" style={{ opacity: this.state.opacity }}>
        This demo shows the usage of <a href="https://github.com/andreaferretti/paths-js">Paths.js</a> together
        with <a href="http://facebook.github.io/react/">Facebook React</a>. Feel free to
        take inspiration for your charts, but remember that Paths.js <a href="https://github.com/andreaferretti/paths-js#philosophy">can be used</a> with
        any frontend framework of your choice (or even with Node).
      </div>
    ) : null;
  }
});