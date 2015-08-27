/**
 * This is the home controller.
 * @memberOf Home Module
 * @namespace Home Controller
 */
(function () {
  'use strict';

  // Register the controller.
  angular.module('app.home').controller('app.home.homeController', HomeController);

  // Inject the dependencies.
  HomeController.$inject = ['app.home.homeService'];

  /**
   * @name homeController
   * @desc Create the controller.
   * @param homeService
   * @memberOf Home Module.Home Controller
   */
  function HomeController(homeService) {

    // Assign this controller as the view-model.
    // It will be accessible as 'homeController' within the HTML template.
    var vm = this;

    // Register the view model's properties.
    vm.stuff = {};
    vm.anything = 'Very well, thank you.';
    vm.getStuff = getStuff;

    // Activate the controller.
    activate();

    // Activates the controller.
    function activate() {
      vm.getStuff();
    }

    // Get stuff from the home service.
    function getStuff() {
      // Load stuff.
      homeService.getStuff().then(success, failure);

      // Success.
      function success(data) {
        vm.stuff = data;
      }

      // Failure.
      function failure(/* status */) {
        // Deal with it!
      }
    }
  }

})();
