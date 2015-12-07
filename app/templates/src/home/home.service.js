/**
 * This is the home service.
 * @memberOf Home Module
 * @namespace Home Service
 */

/**
 * @name HomeService
 * @desc Create the service.
 * @param $q
 * @param homeDataService
 * @memberOf Home Module.Home Service
 * @ngInject
 */
function homeFactory($q, homeDataService) {
    // Create the service.
    var service = {
		getStuff: getStuff
    };
    return service;

    /**
     * @name HomeService.getStuff
     * @desc Call the API to get stuff.
     * @memberOf Home Module.Home Service
     * @returns object An object with stuff.
     */
    function getStuff() {
		// Create the future.
		var deferred = $q.defer();
		// Call the data service to get stuff. We could also implement caching or other useful stuff here.
		homeDataService.getStuff().then(success, error);
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

export default homeFactory;
