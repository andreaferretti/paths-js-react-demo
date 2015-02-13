define([
  'react',
  'lodash'
], function(React, _) {
  return React.createClass({
    render: function() {
      var query = this.props.query.toLowerCase();
      var entries = this.props.data
        .filter(function(entry) {
          return _.contains(entry.name.toLowerCase(), query);
        })
        .map(function(entry) {
          return <li>{ entry.name }: { entry.population }</li>;
        });

      return <ul>{ entries }</ul>;
    }
  });
});