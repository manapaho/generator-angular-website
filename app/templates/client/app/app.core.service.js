/**
 * This is the application core service.
 * We register it via provider to be able to use it within module configurations.
 * It is part of the core module to be available to all other modules.
 * @memberOf Application Core Module
 * @namespace Application Core Service
 */
(function () {
  'use strict';

  // Register the provider.
  angular.module('app.core').provider('app.core.service', coreServiceProvider);

  // Create the provider.
  function coreServiceProvider() {
    // Register the factory.
    this.$get = coreServiceFactory;
  }

  // Create the factory.
  function coreServiceFactory() {
    // Create the service.
    return new CoreService();
  }

  /**
   * @name CoreService
   * @desc Create the service.
   * @memberOf Application Core Module.Application Core Service
   */
  function CoreService() {

    // Instance context.
    var service = this;

    /**
     * @name Service.getLoginUrl
     * @desc When the app is unauthenticated we redirect to this url.
     * @memberOf Application Core Module.Application Core Service
     * @returns string
     */
    service.getLoginUrl = function () {
      // Todo: Just an example. Should usually be injected by grunt taken from an environment varible.
      return 'http://localhost:3000/dialog/authorize?redirect_uri=http://localhost:8000/authorization/accesscode&response_type=code&client_id=trustedClient&scope=offline_access';
    };

    /**
     * @name Service.getApiBaseUrl
     * @desc This is the base url of our api server.
     * @memberOf Application Core Module.Application Core Service
     * @returns string
     */
    service.getApiBaseUrl = function () {
      // Todo: Just an example. Should usually be injected by grunt taken from an environment varible.
      return 'http://localhost:8000';
    };

  }
})();
