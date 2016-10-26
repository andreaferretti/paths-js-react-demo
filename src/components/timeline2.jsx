var React = require('react');
var Zoomable = require('../charts/zoomable.jsx');

function makeData() {
  var data = [];
  for (var y = 2009; y <= 2011; y++) {
    for (var m = 1; m <= 12; m++) {
      var v = 15 + (Math.random() * 10);
      data.push({ year: y, month: m, value: v});
    };
  };
  return data;
}

function date(data) {
  var d = new Date();
  d.setYear(data.year);
  d.setMonth(data.month - 1);
  return d.getTime();
}

function value(d) { return d.value; }

module.exports = React.createClass({
  render: function() {
    return <Zoomable
      data={ makeData() }
      xaccessor={ date }
      yaccessor={ value }
      width={ 420 }
      height={ 340 } />
  }
});