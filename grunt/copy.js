module.exports = {
  server: {
    files: [
      {
        expand: false,
        src: ['index.html'],
        dest: '<%= tmp %>/index.html'
      },
      {
        expand: true,
        src: ['<%= css %>'],
        dest: '<%= tmp %>'
      },
      {
        expand: false,
        src: ['<%= bower %>/requirejs/require.js'],
        dest: '<%= tmp %>/js/require.js'
      }
    ]
  },
  css: {
    files: [
      {
        expand: true,
        src: ['<%= css %>/{,**/}*.css'],
        dest: '<%= dist %>'
      },
      {
        expand: false,
        src: ['<%= bower %>/bootstrap/dist/css/bootstrap.min.css'],
        dest: '<%= dist %>/css/bootstrap.min.css'
      }
    ]
  },
  resources: {
    files: [
      {
        expand: true,
        src: ['<%= fonts %>/{,**/}*.*'],
        dest: '<%= dist %>'
      },
      {
        expand: true,
        src: ['<%= jsondata %>/{,**/}*.*'],
        dest: '<%= dist %>'
      }
    ]
  }
};