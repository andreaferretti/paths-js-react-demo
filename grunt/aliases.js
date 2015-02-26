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
    'copy:resources',
    'requirejs:compile',
    'copy:css',
    'clean:tmp'
  ],
  "default": ['build']
};
