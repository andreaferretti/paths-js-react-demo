module.exports = {
  server: {
    options: {
      hostname: 'localhost',
      port: '<%= port %>',
      base: ['<%= tmp %>', '.', '<%= bower %>/bootstrap/dist'],
      livereload: '<%= livereload %>',
      open: true
    }
  }
};