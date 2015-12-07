/**
 * This is the <%= yeoman.choices.feature %> controller.
 * @memberOf <%= yeoman.choices.Feature %> Module
 * @namespace <%= yeoman.choices.Feature %> Controller
 */

/**
 * @name <%= yeoman.choices.feature %>Controller
 * @desc Create the controller.
 * @param <%= yeoman.choices.feature %>Service
 * @memberOf <%= yeoman.choices.Feature %> Module.<%= yeoman.choices.Feature %> Controller
 * @ngInject
 */
function <%= yeoman.choices.feature %>Controller(<%= yeoman.choices.feature %>Service) {

    // Assign this controller as the view-model.
    // It will be accessible as '<%= yeoman.choices.feature %>Controller' within the HTML template.
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
        <%= yeoman.choices.feature %>Service.getStuff().then(success, failure);

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

export default <%= yeoman.choices.feature %>Controller;
