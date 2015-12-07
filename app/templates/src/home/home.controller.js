/**
 * This is the home controller.
 * @memberOf Home Module
 * @namespace Home Controller
 */

/**
 * @name homeController
 * @desc Create the controller.
 * @param homeService
 * @memberOf Home Module.Home Controller
 * @ngInject
 */
function homeController(homeService) {

    // Assign this controller as the view-model.
    // It will be accessible as 'homeController' within the HTML template.
    var vm = this;

    // Register the view model's properties.
    vm.stuff = {};
    vm.anything = 'angular-ui-grid';
    vm.getStuff = getStuff;
    vm.myData = [
        {
            "firstName": "Cox",
            "lastName": "Carney",
            "company": "Enormo",
            "employed": true
        },
        {
            "firstName": "Lorraine",
            "lastName": "Wise",
            "company": "Comveyer",
            "employed": false
        },
        {
            "firstName": "Nancy",
            "lastName": "Waters",
            "company": "Fuelton",
            "employed": false
        }
    ];
    
    // Activate the controller.
    activate();

    // Activates the controller.
    function activate() {
        vm.getStuff();
    }

    // Get stuff from the home service.
    function getStuff() {
        // Load stuff.
        homeService.getStuff().then(success, failure);

        // Success.
        function success(data) {
            vm.stuff = data;
        }

        // Failure.
        function failure(/* status */) {
            // Deal with it!
        }
    }
}

export default homeController;
