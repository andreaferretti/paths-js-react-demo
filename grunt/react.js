module.exports = {
  server: {
    files: [
      {
        expand: true,
        cwd: '<%= src %>',
        src: ['**/*.jsx'],
        dest: '<%= tmp %>/js',
        ext: '.js'
      }
    ]
  }
};