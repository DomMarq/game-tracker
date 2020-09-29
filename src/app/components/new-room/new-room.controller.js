function NewRoomController(ExampleService) {
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

}

angular.module('components.newRoom').controller('NewRoomController', NewRoomController);
