// Dominic Marques, Connor Kuse
angular.module('app', ['ngMaterial', 'ngMessages']);

/*--------------------- Navbar Component ---------------------*/
const navbar = {
    templateUrl: './navbar/navbar.html',
    controller: 'NavbarController'
};

// Home Component with Routing (Routed / Stateful)
angular.module('app').component('navbar', navbar);

// Home Controller with dependency injection using the array method
function NavbarController() {};

angular.module('app').controller('NavbarController', NavbarController);
/*--------------------- End Navbar Component ---------------------*/

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
        console.log("Data: " + data);
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
    const $ctrl = this;
    $ctrl.createRoom = createRoom;
    
    // Create a room object with user info and send the information to the backend
    function createRoom(room) {
        if (room == undefined) {
            $ctrl.newRoomCreationMessage = "There was an issue. Please try again.";
            $ctrl.newRoomFormSubmission = true;
        } else if (!room.name || !room.type || !room.teams) {
            $ctrl.newRoomCreationMessage = "There was an issue. Please try again.";
            $ctrl.newRoomFormSubmission = true;
        } else {
            var roomJson = angular.toJson(room);
            console.log(roomJson);
            ExampleService.postData(roomJson).then(function() {
                $ctrl.newRoomCreationMessage = "Room created successfully!";
                $ctrl.newRoomFormSubmission = true;
            })
        }
    };
    
}]);

/*--------------------- End New Room Component ---------------------*/

/*--------------------- Room Component ---------------------*/
const room = {
    templateUrl: './room/room.html',
    controller: 'RoomController'
};

angular.module('app').component('room', room);

angular.module('app').controller('RoomController', ['ExampleService', function (ExampleService) {
    const $ctrl = this;
    $ctrl.roomLoaded = false;

    $ctrl.room = {
        name: "",
        type: "",
        teams: {}
    }
    
    $ctrl.updateRoomName = function(event) {
        $ctrl.room = event.room;
    }
    
    // Load room information into room
    ExampleService.getRoomData().then(function(response) {
        $ctrl.room = response.data["Game1"];
        console.log($ctrl.room);
        console.log($ctrl.room.name);
        $ctrl.roomLoaded = true;

    })    
}]);

/*--------------------- End Room Component ---------------------*/

/*--------------------- Team Component ---------------------*/
const team = {
    templateUrl: './team/team.html',
    controller: 'TeamController',
    bindings: {
        team: '<'
    }
};

angular.module('app').component('team', team);
angular.module('app').controller('TeamController', ['ExampleService', function (ExampleService) {}]);

/*--------------------- End Team Component ---------------------*/

/*--------------------- Room Name Change Component ---------------------*/
const rnchange = {
    templateUrl: './rnchange/rnchange.html',
    controller: 'RoomNameChangeController',
    bindings: {
        room: '<',
        onUpdate: '&'
    }
};

angular.module('app').component('rnchange', rnchange);
angular.module('app').controller('RoomNameChangeController', function() {
    this.$onChanges = function(changes) { // received when parent (room) changes data
        if (changes.room) {
            this.room = angular.copy(this.room); // breaks pass by reference
        }  
    };
    this.updateRoomName = function() { // called when submit button is pressed
        this.onUpdate({ // outgoing bound event
            $event: {
                room: this.room // value to pass back
            }
        });
    }
});

/*--------------------- End Room Name Change Component ---------------------*/