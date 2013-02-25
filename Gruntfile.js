module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      app: {
        files: 'app/js/**/*.js',
        tasks: ['copy', 'requirejs']
      }
    },
    requirejs: {
      compile: {
        options: {
          appDir: 'app/',
          baseUrl: 'js',
          paths: {
            text: 'lib/text'
          },
          dir: 'build/',
          modules: [{ name: 'main' }],
          shim: {
            'app': {
              deps: ['lib/underscore-min', 'lib/backbone-min']
            },
            'lib/backbone-min': {
              deps: ['lib/underscore-min'],
              exports: 'Backbone'
            },
            'lib/underscore-min': {
              exports: '_'
            }
          }
        }
      }
    },
    copy: {
      requirejs: {
        files: [
          {
            src: 'node_modules/requirejs/require.js',
            dest: 'app/js/lib/require.js'
          }
        ]
      },
      mocha: {
        files: [
          {
            src: 'node_modules/mocha/mocha.css',
            dest: 'app/css/mocha.css'
          },
          {
            src: 'node_modules/mocha/mocha.js',
            dest: 'app/js/lib/mocha.js'
          },
          {
            src: 'node_modules/chai/chai.js',
            dest: 'app/js/lib/chai.js'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy', 'requirejs', 'watch']);
};