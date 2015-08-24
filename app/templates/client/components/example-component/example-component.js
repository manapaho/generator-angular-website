/**
 * This is the example-component directive.
 * @memberOf Example-Component Module
 * @namespace Example-Component Directive
 */
(function () {
  'use strict';

  // Create the module and register the directive.
  angular.module('example-component').directive('exampleComponent', ExampleComponentDirective);

  // Inject the dependencies.
  ExampleComponentDirective.$inject = [];

  /**
   * @name ExampleComponentDirective
   * @desc Create the directive.
   * @memberOf Example-Component Module.Example-Component Directive
   */
  function ExampleComponentDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'components/example-component/example-component.html',
      compile: function compile(/*templateElement, templateAttribute, transclude*/) {
        return {
          pre: function (/*scope, linkElement, attributes, controller*/) {
          },
          post: function (/*scope, linkElement, attributes, controller*/) {
          }
        };
      }
    };
  }

})();
