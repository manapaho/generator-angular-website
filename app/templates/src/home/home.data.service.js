/**
 * This is the home data service.
 * @memberOf Home Module
 * @namespace Home Data Service
 */

/**
 * @name HomeDataService
 * @desc Create the data service.
 * @param $q
 * @param $http
 * @param coreService
 * @memberOf Home Module.Home Data Service
 * @ngInject
 */
var homeDataFactory = function ($q, $http, coreService) {
    // Create the service.
    var service = {
		getStuff: getStuff
    };
    return service;

    /**
     * @name HomeDataService.getStuff
     * @desc Call the API to get stuff.
     * @memberOf Home Module.Home Data Service
     * @returns object An object with stuff.
     */
    function getStuff() {
		// Create the future.
		var deferred = $q.defer();
		// Call the API to get stuff.
		$http.get(coreService.getApiBaseUrl() + '/api/home/stuff').success(success).error(error);
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

export default homeDataFactory;
