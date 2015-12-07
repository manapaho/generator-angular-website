/**
 * Home Controller Tests.
 */
'use strict';

import homeModule from './home.module.js';

describe('Controller: homeController', function () {

  // Define the Angular services used by this test suite.
  var $controller, $q, $rootScope;

  // Called before each test. Initialises the Angular services used by this test suite,
  // and generates the mock services/dependencies used by the tests.
  beforeEach(function () {

    // Specify the module of the functionality to test.
    angular.mock.module(homeModule);

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
      mockHomeService: {},
      getControllerToTest: getControllerToTest
    };

    // Create mock services/dependencies and define their mock functions.
    mocks.mockHomeService = jasmine.createSpyObj('homeService', ['getStuff']);

    // Define default return values for the mock functions.
    var getStuffPromise = $q.when({
      something: 'whatever'
    });
    mocks.mockHomeService.getStuff.and.returnValue(getStuffPromise);

    /// Returns the controller to test, injected with the mocked services/dependencies.
    function getControllerToTest() {

      var controller = $controller('homeController', {
        homeService: mocks.mockHomeService
      });

      return controller;
    }

    return mocks;
  }
});
