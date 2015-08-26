/**
 * This is the <%= yeoman.choices.feature %> routes configuration.
 * Only configure routes in this file.
 * @memberOf <%= yeoman.choices.Feature %> Module
 * @namespace <%= yeoman.choices.Feature %> Routes
 */
(function () {
  'use strict';

  // Register the routes configuration.
  angular.module('<%= yeoman.choices.module %>').config(config);

  // Inject the dependencies.
  config.$inject = ['$stateProvider'];

  /**
   * @name config
   * @desc Configures the routes.
   * @param $stateProvider
   * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Routes
   */
  function config($stateProvider) {

    // Create the <%= yeoman.choices.feature %> state and assign the template and controller.
    $stateProvider
      .state('<%= yeoman.choices.state %>', {
        url: '<%= yeoman.choices.url %>',
        templateUrl: '<%= yeoman.choices.outputDir %>/<%= yeoman.choices.feature %>.html',
        controller: '<%= yeoman.choices.module %>.<%= yeoman.choices.feature %>Controller',
        controllerAs: '<%= yeoman.choices.feature %>Controller'
      });
  }

})();
