angular.module('app', ['ngMaterial', 'ngMessages']);

/*--------------------- Home Component ---------------------*/
const home = {
    templateUrl: './home/home.html',
    controller: 'HomeController'
};

// Home Component with Routing (Routed / Stateful)
angular.module('app').component('home', home);

// Home Controller with dependency injection using the array method
angular.module('app').controller('HomeController', ['ExampleService', function (ExampleService) {
    this.exampleVariable = "Hello world";
}]);
/*--------------------- End Home Component ---------------------*/

/*--------------------- Settings Component ---------------------*/
const settings = {
    templateUrl: '',
    controller: 'SettingsController'
};

// Settings Component with Routing (Routed / Stateful)
angular.module('app').component('settings', settings);

// Settings Controller with dependency injection using $inject method
function SettingsController(ExampleService) {

};
SettingsController.$inject = ['ExampleService'];
angular.module('app').controller('SettingsController', SettingsController);
/*--------------------- End Settings Component ---------------------*/

/*--------------------- Example Service ---------------------*/
function ExampleService($http) {
    // Services are Singletons
    // Properties
    // Methods
    this.getRoomData = getRoomData;
    this.postData = postData;
    
    // Get data from API
    function getRoomData() {
        return $http({
            method: 'GET',
            url: 'data.json'
        });
    }
    
    // send data to backend
    function postData(data) {
        return $http({
            method: 'PUT',
            url: 'data.json',
            data: data
        })
    }
};
ExampleService.$inject = ['$http'];
angular.module('app').service('ExampleService', ExampleService);
/*--------------------- End Example Service ---------------------*/

/*--------------------- New Room Component ---------------------*/
const newRoom = {
    templateUrl: './new-room/new-room.html',
    controller: 'NewRoomController'
};

angular.module('app').component('newRoom', newRoom);

angular.module('app').controller('NewRoomController', ['ExampleService', function (ExampleService) {
    this.createRoom = createRoom;
    
    function createRoom(room) {
//        ExampleService.getRoomData().then(function(response) {console.log(response.data)});
        console.log(angular.toJson(room));
        ExampleService.postData(room);
    };
    
}]);

/*--------------------- End New Room Component ---------------------*/
