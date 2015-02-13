define([
  'react',
  'react-bootstrap/Input'
], function(React, Input) {
  return React.createClass({
    render: function() {
      return <Input type="text" placeholder="Filter here" valueLink={ this.props.valueLink } />;
    }
  });
});