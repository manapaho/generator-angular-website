/**
 * This is the application's run setup.
 * @memberOf Application Module
 * @namespace Application Run
 */
(function () {
  'use strict';

  // Register the application's run setup.
  angular.module('app').run(run);

  // Inject the dependencies.
  run.$inject = ['$rootScope', '$state'];

  /**
   * @name config
   * @desc Setup the application.
   * @param $rootScope
   * @param $state
   * @memberOf Application Module.Application Run
   */
  function run(/*$rootScope, $state*/) {
  }

})();
