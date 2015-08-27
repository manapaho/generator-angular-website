/**
 * This is the home routes configuration.
 * Only configure routes in this file.
 * @memberOf Home Module
 * @namespace Home Routes
 */
(function () {
  'use strict';

  // Register the routes configuration.
  angular.module('app.home').config(config);

  // Inject the dependencies.
  config.$inject = ['$stateProvider'];

  /**
   * @name config
   * @desc Configures the routes.
   * @param $stateProvider
   * @memberOf Home Module.Home Routes
   */
  function config($stateProvider) {

    // Create the home state and assign the template and controller.
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'app.home.homeController',
        controllerAs: 'homeController'
      });
  }

})();
