define([
  'pajamas'
], function(pj) {
  var base_url = 'https://api.github.com/repos/andreaferretti/paths-js-react-demo/contents/js/';

  return function(path) {
    return pj({
      url: base_url + path + '.jsx',
      dataType :'json'
    }).then(function(data) { return atob(data.content); });
  };
});