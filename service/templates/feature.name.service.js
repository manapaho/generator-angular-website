/**
 * This is the <%= yeoman.choices.name %> service.
 * @memberOf <%= yeoman.choices.Feature %> Module
 * @namespace <%= yeoman.choices.Name %> Service
 */
(function () {
  'use strict';

  // Register the service.
  angular.module('<%= yeoman.choices.module %>').factory('<%= yeoman.choices.module %>.<%= yeoman.choices.name %>Service', <%= yeoman.choices.Name %>Factory);

  // Inject the dependencies.
  <%= yeoman.choices.Name %>Factory.$inject = ['$q'];

  /**
   * @name <%= yeoman.choices.Name %>Service
   * @desc Create the service.
   * @param $q
   * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Name %> Service
   */
  function <%= yeoman.choices.Name %>Factory($q) {
    // Create the service.
    var service = {
      doSomething: doSomething
    };
    return service;

    /**
     * @name <%= yeoman.choices.Name %>Service.doSomething
     * @desc Do something to get stuff.
     * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Name %> Service
     * @returns object An object with stuff.
     */
    function doSomething() {
      // Create the future.
      var deferred = $q.defer();
      // TODO: Do something and resolve the promise.
      success({stuff: 'something'});
      // Return the promise.
      return deferred.promise;

      // this callback will be called asynchronously when the response is available
      function success(data) {
        deferred.resolve(data);
      }
    }
  }

})();
