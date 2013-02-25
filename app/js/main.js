requirejs.config({
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
});

require(['app'], function(App) {
  window.bTask = new App();
});