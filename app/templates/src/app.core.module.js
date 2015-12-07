/**
 * Import all module depenencies here.
 * Add commonly used modules to externals.
 */
import angular from 'angular';
import ngCookies from 'angular-cookies';
import ngMessages from 'angular-messages';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngTranslate from 'angular-translate/dist/angular-translate.js';
import ngTranslateLoaderStaticFiles from 'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.js';
import uiBootstrap from 'angular-ui-bootstrap';
import uiGrid from 'angular-ui-grid/ui-grid.js';
import uiRouter from 'angular-ui-router/release/angular-ui-router.js';
import coreServiceProvider from './app.core.service.js';
/**
 * This is the shared dependencies module. It will be referenced by most application modules.
 * Only declare the module's dependencies in this file.
 * @namespace Application Core Module
 */
angular.module('core', [
  // Angular modules.
  ngCookies,
  ngMessages,
  ngResource,
  ngSanitize,
  // Component Modules.
  // 'example-component',
  // 3rd-party modules.
  'pascalprecht.translate',
  uiBootstrap,
  'ui.grid',
  'ui.router'
])
// Register service.
.provider('coreService', coreServiceProvider);

export default 'core';