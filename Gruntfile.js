var wpConfig = require('./webpack.config.js');
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      reload: {
        files: [
          'build/**/*'
        ],
        livereload: true
      },
      wp: {
        files: [
          'app/**/*.js',
          'app/**/*.html',
          'app/**/*.css'
        ],
        tasks: [
          'webpack:dev'
        ]
      },
      express: {
        files: [
          'server/**/*.js'
        ],
        tasks: [
          'express:main'
        ],
        options: {
          spawn: false
        }
      }
    },
    open: {
      app: {
        path: 'http://localhost:3000'
      }
    },
    webpack: {
      "options": wpConfig.base,
      "dev": wpConfig.dev,
      "prod": wpConfig.prod
    },
    express: {
      options: {},
      main: {
        options: {
          script: 'server/index.js',
          nospawn: true,
          delay: 5
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['webpack:dev', 'express', 'open',  'watch']);
  grunt.registerTask('dev', ['default']);
  grunt.registerTask('build', ['webpack:prod']);
};
