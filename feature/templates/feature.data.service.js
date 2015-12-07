/**
 * This is the <%= yeoman.choices.feature %> data service.
 * @memberOf <%= yeoman.choices.Feature %> Module
 * @namespace <%= yeoman.choices.Feature %> Data Service
 */

/**
 * @name <%= yeoman.choices.Feature %>DataService
 * @desc Create the data service.
 * @param $q
 * @param $http
 * @param coreService
 * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Data Service
 * @ngInject
 */
var <%= yeoman.choices.feature %>DataFactory = function ($q, $http, coreService) {
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

export default <%= yeoman.choices.feature %>DataFactory;
