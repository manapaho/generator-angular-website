/**
 * This is the application module's configuration.
 * Do NOT configure routes in this file.
 * @memberOf Application Module
 * @namespace Application Config
 */

/**
 * @name config
 * @desc Configures the module.
 * @param $locationProvider
 * @param $translateProvider
 * @memberOf Application Module.Application Config
 * @ngInject
 */
var config = function ($locationProvider, $translateProvider) {

  // Enable HTML5 routing mode instead of using hash-routing.
  $locationProvider.html5Mode(true);

  // sanitize: sanitizes HTML in the translation text using `$sanitize`
  // escape: escapes HTML in the translation
  // sanitizeParameters: sanitizes HTML in the values of the interpolation parameters using `$sanitize`
  // escapeParameters: escapes HTML in the values of the interpolation parameters
  $translateProvider.useSanitizeValueStrategy('escape');

  // Load the translations.
  $translateProvider.useStaticFilesLoader({
    prefix: '/assets/translations/',
    suffix: '.json'
  }).preferredLanguage('de').fallbackLanguage('en');
  //.determinePreferredLanguage();  // Determine the language from the browser properties.
}

export default config;