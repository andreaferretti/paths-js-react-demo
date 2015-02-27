module.exports = {
  server: {
    options: {
      hostname: 'localhost',
      port: '<%= port %>',
      base: ['<%= tmp %>', '.', '<%= bower %>/bootstrap/dist', 'highlight'],
      livereload: '<%= livereload %>',
      open: true
    }
  }
};