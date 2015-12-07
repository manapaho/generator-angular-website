/**
 * This is the application's routes configuration.
 * Only configure routes in this file.
 * @memberOf Application Module
 * @namespace Application Routes
 */

/**
 * @name config
 * @desc Configures the routes.
 * @param $urlRouterProvider
 * @memberOf Application Module.Application Routes
 * @ngInject
 */
var route = function ($urlRouterProvider) {

  // Register the default route.
  $urlRouterProvider.otherwise('/home');
}

export default route;