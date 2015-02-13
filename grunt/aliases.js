module.exports = {
  server: [
    'copy:server',
    'react:server',
    'connect:server',
    'watch'
  ],
  build: [
    'clean',
    'copy:server',
    'react:server',
    'requirejs:compile',
    'copy:css',
    'clean:tmp'
  ],
  "default": ['build']
};
