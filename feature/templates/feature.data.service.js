/**
 * This is the <%= yeoman.choices.feature %> data service.
 * @memberOf <%= yeoman.choices.Feature %> Module
 * @namespace <%= yeoman.choices.Feature %> Data Service
 */
(function () {
  'use strict';

  // Register the service.
  angular.module('<%= yeoman.choices.module %>').factory('<%= yeoman.choices.module %>.<%= yeoman.choices.feature %>DataService', <%= yeoman.choices.Feature %>DataFactory);

  // Inject the dependencies.
  <%= yeoman.choices.Feature %>DataFactory.$inject = ['$q', '$http', 'app.core.service'];

  /**
   * @name <%= yeoman.choices.Feature %>DataService
   * @desc Create the data service.
   * @param $q
   * @param $http
   * @param coreService
   * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Data Service
   */
  function <%= yeoman.choices.Feature %>DataFactory($q, $http, coreService) {
    // Create the service.
    var service = {
      getStuff: getStuff
    };
    return service;

    /**
     * @name <%= yeoman.choices.Feature %>DataService.getStuff
     * @desc Call the API to get stuff.
     * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Data Service
     * @returns object An object with stuff.
     */
    function getStuff() {
      // Create the future.
      var deferred = $q.defer();
      // Call the API to get stuff.
      $http.get(coreService.getApiBaseUrl() + '/api/<%= yeoman.choices.feature %>/stuff').success(success).error(error);
      // Return the promise.
      return deferred.promise;

      // This callback will be called asynchronously when the response is available
      function success(data/*, status, headers, config*/) {
        deferred.resolve(data);
      }

      // Called asynchronously if an error occurs or server returns response with an error status.
      function error(data, status/*, headers, config*/) {
        deferred.reject(status);
      }
    }
  }

})();
