/**
 * Import all module depenencies here.
 * Add commonly used modules to externals.
 */
import core from '../app.core.module.js';
import <%= yeoman.choices.feature %>Config from './<%= yeoman.choices.feature %>.config.js';
import <%= yeoman.choices.feature %>Route from './<%= yeoman.choices.feature %>.route.js';
import <%= yeoman.choices.feature %>Controller from './<%= yeoman.choices.feature %>.controller.js';
import <%= yeoman.choices.feature %>Service from './<%= yeoman.choices.feature %>.service.js';
import <%= yeoman.choices.feature %>DataService from './<%= yeoman.choices.feature %>.data.service.js';
/**
 * Import all feature styles here.
 */
import './<%= yeoman.choices.feature %>.less';
/**
 * This is the <%= yeoman.choices.feature %> module. It it the entry point for this website.
 * Only declare the module's dependencies in this file.
 * @namespace <%= yeoman.choices.Feature %> Module
 */
angular.module('<%= yeoman.choices.feature %>', [
  // Shared modules.
  core
])
// Register config.
.config(<%= yeoman.choices.feature %>Config)
// Register route.
.config(<%= yeoman.choices.feature %>Route)
// Register controller.
.controller('<%= yeoman.choices.feature %>Controller', <%= yeoman.choices.feature %>Controller)
// Register service.
.factory('<%= yeoman.choices.feature %>Service', <%= yeoman.choices.feature %>Service)
// Register data service.
.factory('<%= yeoman.choices.feature %>DataService', <%= yeoman.choices.feature %>DataService);

export default '<%= yeoman.choices.feature %>';