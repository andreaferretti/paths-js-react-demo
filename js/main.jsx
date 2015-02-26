requirejs.config({
  baseUrl: './js',
  paths: {
    'text' :               '../../bower_components/requirejs-text/text',
    'json' :               '../../bower_components/requirejs-plugins/src/json',
    'react':               '../../bower_components/react/react-with-addons',
    'react-bootstrap':     '../../bower_components/react-bootstrap',
    'q':                   '../../bower_components/q/q',
    'pajamas':             '../../bower_components/pajamas/dist/pajamas',
    'lodash':              '../../bower_components/lodash/lodash',
    'paths':               '../../bower_components/paths-js/dist/amd',
    'vivus':               '../../bower_components/vivus/dist/vivus',
    'data':                '../data'
  },
  shim: {
    'vivus': { exports: 'Vivus' }
  }
});

require(['react', 'components/composite'], function(React, Composite) {
  return React.render(<Composite />, document.body);
});