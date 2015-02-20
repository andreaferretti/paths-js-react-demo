module.exports = function(grunt) {
  return require('load-grunt-config')(grunt, {
    config: {
      bower: 'bower_components',
      src: 'js',
      css: 'css',
      fonts: 'fonts',
      dist: 'dist',
      tmp: '.tmp',
      port: 9000,
      livereload: 35729
    },
    init: true
  });
};