/**
 * This is the <%= yeoman.choices.feature %> routes configuration.
 * Only configure routes in this file.
 * @memberOf <%= yeoman.choices.Feature %> Module
 * @namespace <%= yeoman.choices.Feature %> Routes
 */
import <%= yeoman.choices.feature %>Template from './<%= yeoman.choices.feature %>.html';
/**
 * @name config
 * @desc Configures the routes.
 * @param $stateProvider
 * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Routes
 * @ngInject
 */
var config = function ($stateProvider) {

    // Create the <%= yeoman.choices.feature %> state and assign the template and controller.
    $stateProvider
		.state('<%= yeoman.choices.feature %>', {
			url: '/<%= yeoman.choices.feature %>',
			template: <%= yeoman.choices.feature %>Template,
			controller: '<%= yeoman.choices.feature %>Controller',
			controllerAs: '<%= yeoman.choices.feature %>Controller'
		});
}

export default config;
