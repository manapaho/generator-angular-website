/**
 * This is the <%= yeoman.choices.feature %> controller.
 * @memberOf <%= yeoman.choices.Feature %> Module
 * @namespace <%= yeoman.choices.Feature %> Controller
 */
(function () {
  'use strict';

  // Register the controller.
  angular.module('<%= yeoman.choices.module %>').controller('<%= yeoman.choices.module %>.<%= yeoman.choices.feature %>Controller', <%= yeoman.choices.Feature %>Controller);

  // Inject the dependencies.
  <%= yeoman.choices.Feature %>Controller.$inject = ['<%= yeoman.choices.module %>.<%= yeoman.choices.feature %>Service'];

  /**
   * @name <%= yeoman.choices.feature %>Controller
   * @desc Create the controller.
   * @param <%= yeoman.choices.feature %>Service
   * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Controller
   */
  function <%= yeoman.choices.Feature %>Controller(<%= yeoman.choices.feature %>Service) {

    // Assign this controller as the view-model.
    // It will be accessible as '<%= yeoman.choices.feature %>Controller' within the HTML template.
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
      <%= yeoman.choices.feature %>Service.getStuff().then(success, failure);

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
