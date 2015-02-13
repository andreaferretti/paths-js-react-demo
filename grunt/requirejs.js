module.exports = {
  compile: {
    options: {
      baseUrl: 'js/',
      appDir: '<%= tmp %>',
      dir: '<%= dist %>',
      skipDirOptimize: true,
      removeCombined: true,
      keepBuildDir: true,
      preserveLicenseComments: false,
      mainConfigFile: '<%= tmp %>/js/main.js',
      optimize: 'uglify',
      name: 'main'
    }
  }
};