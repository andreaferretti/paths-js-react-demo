module.exports = {
  options: {
    interrupt: true
  },
  react: {
    files: [
      '<%= src %>/{,**/}*.jsx'
    ],
    tasks: ['react:compile'],
    options: {
      livereload: '<%= livereload %>'
    }
  },
  files: {
    files: [
      '<%= tmp %>/{,**/}*.html',
      '<%= tmp %>/css/{,**/}*.css',
      '<%= tmp %>/js/{,**/}*.js',
      '<%= tmp %>/images/{,**/}*.{png,jpg,jpeg}'
    ],
    tasks: [],
    options: {
      livereload: '<%= livereload %>'
    }
  }
};