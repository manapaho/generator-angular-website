/**
 * This is the application's routes configuration.
 * Only configure routes in this file.
 * @memberOf Application Module
 * @namespace Application Routes
 */
(function () {
  'use strict';

  // Register the application's routes configuration.
  angular.module('app').config(config);

  // Inject the dependencies.
  config.$inject = ['$urlRouterProvider'];

  /**
   * @name config
   * @desc Configures the routes.
   * @param $urlRouterProvider
   * @memberOf Application Module.Application Routes
   */
  function config($urlRouterProvider) {

    // Register the default route.
    $urlRouterProvider.otherwise('/home');
  }

})();
