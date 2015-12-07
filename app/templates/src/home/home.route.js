/**
 * This is the home routes configuration.
 * Only configure routes in this file.
 * @memberOf Home Module
 * @namespace Home Routes
 */
import homeTemplate from './home.html';
/**
 * @name config
 * @desc Configures the routes.
 * @param $stateProvider
 * @memberOf Home Module.Home Routes
 * @ngInject
 */
var config = function ($stateProvider) {

    // Create the home state and assign the template and controller.
    $stateProvider
		.state('home', {
			url: '/home',
			template: homeTemplate,
			controller: 'homeController',
			controllerAs: 'homeController'
		});
}

export default config;
