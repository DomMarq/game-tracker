function NewRoomController(RoomModel, $stateProvider, $state) {
    const $ctrl = this;
    $ctrl.$onInit = function() {
        $ctrl.createRoom = createRoom;
        $ctrl.isSubmitted = false;
    }

    // Create a room object with user info and send the information to the backend
    function createRoom(room) {
        if (room == undefined) {
            $ctrl.newRoomCreationMessage =
                "There was an issue. Please try again.";
            $ctrl.newRoomFormSubmission = true;
        } else if (!room.name || !room.type || !room.teams) {
            $ctrl.newRoomCreationMessage =
                "There was an issue. Please try again.";
            $ctrl.newRoomFormSubmission = true;
        } else {
            $ctrl.isSubmitted = true;
            var roomJson = angular.toJson(room);
            console.log(roomJson);
            /*ExampleService.postData(roomJson).then(function() {
                $ctrl.newRoomCreationMessage = "Room created successfully!";
                $ctrl.newRoomFormSubmission = true;
            })*/
            var newRoom = RoomModel.New();
            newRoom.save({
                    name: room.name,
                    gameType: room.type
                })
                .then((newRoom) => {
                    console.log(newRoom);
                    $state.go('room', {
                        id: newRoom.id
                    });
                });
        }
    };

}

NewRoomController.$inject = ['RoomModel', '$window', '$state'];
angular.module('components.newRoom')
    .controller('NewRoomController', NewRoomController);