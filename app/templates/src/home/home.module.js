/**
 * Import all module depenencies here.
 * Add commonly used modules to externals.
 */
import core from '../app.core.module.js';
import homeConfig from './home.config.js';
import homeRoute from './home.route.js';
import homeController from './home.controller.js';
import homeService from './home.service.js';
import homeDataService from './home.data.service.js';
/**
 * Import all feature styles here.
 */
import './home.less';
/**
 * This is the home module. It it the entry point for this website.
 * Only declare the module's dependencies in this file.
 * @namespace Home Module
 */
angular.module('home', [
  // Shared modules.
  core
])
// Register config.
.config(homeConfig)
// Register route.
.config(homeRoute)
// Register controller.
.controller('homeController', homeController)
// Register service.
.factory('homeService', homeService)
// Register data service.
.factory('homeDataService', homeDataService);

export default 'home';