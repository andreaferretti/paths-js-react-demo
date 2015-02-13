define([
  'react',
], function(React) {
  return React.createClass({
    render: function() {
      return (
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title">{ this.props.title }</h2>
            <span class="links">
              <a>Coffescript</a>
              <a>HTML</a>
            </span>
          </div>

          <div class="panel-body">
            <p class="alert alert-info">{ this.props.text }</p>

            { this.props.children }
          </div>
        </div>
    )}
  });
});