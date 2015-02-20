module.exports = {
  server: [
    'copy:server',
    'react:compile',
    'connect:server',
    'watch'
  ],
  build: [
    'clean',
    'copy:server',
    'react:compile',
    'requirejs:compile',
    'copy:css',
    'copy:fonts',
    'clean:tmp'
  ],
  "default": ['build']
};
