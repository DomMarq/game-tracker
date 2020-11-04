function NewRoomController(RoomModel, $stateProvider, $state, AuthService) {
    const $ctrl = this;
    $ctrl.$onInit = function() {
        $ctrl.createRoom = createRoom;
        $ctrl.isSubmitted = false;
        $ctrl.isLoggedIn = AuthService.isAuthenticated;
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

            var newRoom = RoomModel.New();
            newRoom.save({
                    name: room.name,
                    gameType: room.type
                })
                .then((newRoom) => {
                    console.log(newRoom);
                    if (room.private && $ctrl.isLoggedIn) AuthService
                        .setAdmin(newRoom);
                    $state.go('room', {
                        id: newRoom.id
                    });
                });
        }
    };

}

NewRoomController.$inject = ['RoomModel', '$window', '$state', 'AuthService'];
angular.module('components.newRoom')
    .controller('NewRoomController', NewRoomController);