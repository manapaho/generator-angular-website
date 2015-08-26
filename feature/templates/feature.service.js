/**
 * This is the <%= yeoman.choices.feature %> service.
 * @memberOf <%= yeoman.choices.Feature %> Module
 * @namespace <%= yeoman.choices.Feature %> Service
 */
(function () {
  'use strict';

  // Register the service.
  angular.module('<%= yeoman.choices.module %>').factory('<%= yeoman.choices.module %>.<%= yeoman.choices.feature %>Service', <%= yeoman.choices.Feature %>Factory);

  // Inject the dependencies.
  <%= yeoman.choices.Feature %>Factory.$inject = ['$q', '<%= yeoman.choices.module %>.<%= yeoman.choices.feature %>DataService'];

  /**
   * @name <%= yeoman.choices.Feature %>Service
   * @desc Create the service.
   * @param $q
   * @param <%= yeoman.choices.feature %>DataService
   * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Service
   */
  function <%= yeoman.choices.Feature %>Factory($q, <%= yeoman.choices.feature %>DataService) {
    // Create the service.
    var service = {
      getStuff: getStuff
    };
    return service;

    /**
     * @name <%= yeoman.choices.Feature %>Service.getStuff
     * @desc Call the API to get stuff.
     * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Service
     * @returns object An object with stuff.
     */
    function getStuff() {
      // Create the future.
      var deferred = $q.defer();
      // Call the data service to get stuff. We could also implement caching or other useful stuff here.
      <%= yeoman.choices.feature %>DataService.getStuff().then(success, error);
      // Return the promise.
      return deferred.promise;

      // this callback will be called asynchronously when the response is available
      function success(data) {
        deferred.resolve(data);
      }

      // called asynchronously if an error occurs or server returns response with an error status.
      function error(status) {
        deferred.reject(status);
      }
    }
  }

})();
