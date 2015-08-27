/**
 * This is the <%= yeoman.choices.name %> controller.
 * @memberOf <%= yeoman.choices.Feature %> Module
 * @namespace <%= yeoman.choices.Name %> Controller
 */
(function () {
  'use strict';

  // Register the controller.
  angular.module('<%= yeoman.choices.module %>').controller('<%= yeoman.choices.module %>.<%= yeoman.choices.name %>Controller', <%= yeoman.choices.Name %>Controller);

  // Inject the dependencies.
  <%= yeoman.choices.Name %>Controller.$inject = [];

  /**
   * @name <%= yeoman.choices.name %>Controller
   * @desc Create the controller.
   * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Name %> Controller
   */
  function <%= yeoman.choices.Name %>Controller() {

    // Assign this controller as the view-model.
    // It will be accessible as '<%= yeoman.choices.name %>Controller' within the HTML template.
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
      success({something: 'whatever'});

      // Success.
      function success(data) {
        vm.stuff = data;
      }
    }
  }

})();
