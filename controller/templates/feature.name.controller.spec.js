/**
 * <%= yeoman.choices.Name %> Controller Tests.
 */
'use strict';

describe('Controller: <%= yeoman.choices.module %>.<%= yeoman.choices.name %>Controller', function () {

  // Define the Angular services used by this test suite.
  var $controller, $q, $rootScope;

  // Called before each test. Initialises the Angular services used by this test suite,
  // and generates the mock services/dependencies used by the tests.
  beforeEach(function () {

    // Specify the module of the functionality to test.
    module('<%= yeoman.choices.module %>');

    // Initialises the Angular services used by this test suite.
    inject(function (_$controller_, _$q_, _$rootScope_) {
      $controller = _$controller_;
      $q = _$q_;
      $rootScope = _$rootScope_;
    });
  });

  describe('The controller ', function () {

    it('should be instantiated', function () {
      // Arrange.
      var mocks = getMocks();
      var controller = mocks.getControllerToTest();

      // Assert.
      expect(controller).toBeTruthy();
    });
  });

  // Creates the mock services/dependencies and defines their mock functions.
  function getMocks() {

    // Contains the mock services/dependencies used by the tests.
    var mocks = {
      getControllerToTest: getControllerToTest
    };

    // Returns the controller to test, injected with the mocked services/dependencies.
    function getControllerToTest() {

      var controller = $controller('<%= yeoman.choices.module %>.<%= yeoman.choices.name %>Controller', {
        // Put injected mocks here.
      });

      return controller;
    }

    return mocks;
  }
});
