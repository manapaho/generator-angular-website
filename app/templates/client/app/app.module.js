/**
 * This is the application module. It it the entry point for this website.
 * Only declare the module's dependencies in this file.
 * @namespace Application Module
 */
(function () {
  'use strict';

  // Create the module and declare its dependencies.
  angular.module('app', [
      // Shared modules.
      'app.core',
      // Feature areas.
      'app.home'
      // yeoman:inject:feature
    ]
  );

})();
