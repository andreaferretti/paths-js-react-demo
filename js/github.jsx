var Promise = require('bluebird');
var fetch = require('fetchify')(Promise).fetch;
var base_url = 'https://api.github.com/repos/andreaferretti/paths-js-react-demo/contents/js/';

module.exports = function(path) {
  var suffix = path.startsWith('data/') ? '.json' : '.jsx';

  return fetch(base_url + path + suffix).
    then(function(resp) { return resp.json() }).
    then(function(data) { return atob(data.content); })
};