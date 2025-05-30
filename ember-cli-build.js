/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapFont: false,
      importBootstrapCSS: false,
      insertEmberWormholeElementToDom: false
    },
    'ember-cli-babel': {
      includePolyfill: true,
    },

    'ember-cli-terser': {
      enabled: false,
    },
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
    minifyCSS: {
      enabled: false,
    },
  });

  /*  app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css');
    app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js');
    app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
      destDir: 'fonts'
    });
  */
  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
