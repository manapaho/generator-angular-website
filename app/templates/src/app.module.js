/**
 * Import all module depenencies here.
 * Add commonly used modules to externals.
 */
import core from './app.core.module.js';
import home from './home/home.module.js';
// yeoman:inject:feature
import appConfig from './app.config.js';
import appRoute from './app.route.js';
import appRun from './app.run.js';
/**
 * Import all application styles here.
 */
import './app.whitelabel.less';
/**
 * This is the application module. It it the entry point for this website.
 * Only declare the module's dependencies in this file.
 * @namespace Application Module
 */
angular.module('app', [
  // Shared modules.
  core,
  // Feature areas.
  home
  // yeoman:inject:feature
])
// Register config.
.config(appConfig)
// Register route.
.config(appRoute)
// Register run.
.run(appRun);

export default 'app';
