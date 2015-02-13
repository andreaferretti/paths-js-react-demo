requirejs.config({
  baseUrl: './js',
  paths: {
    'react':               '../../bower_components/react/react-with-addons',
    'react-bootstrap':     '../../bower_components/react-bootstrap',
    'q':                   '../../bower_components/q/q',
    'pajamas':             '../../bower_components/pajamas/dist/pajamas',
    'lodash':              '../../bower_components/lodash/lodash',
    'paths':               '../../bower_components/paths-js/dist/amd'
  }
});

require(['react', 'components/composite'], function(React, Composite) {
  return React.render(<Composite />, document.body);
});