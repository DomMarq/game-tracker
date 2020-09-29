function RoomController() {
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
}

// TODO: Add the room info request service
RoomController.$inject = ['ExampleService'];
angular.module('app').controller('RoomController', RoomController);
