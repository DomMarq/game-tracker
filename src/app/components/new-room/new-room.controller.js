function NewRoomController(AuthService, RoomModel, MemberModel, $stateProvider, $state) {
    const $ctrl = this;
    $ctrl.$onInit = function() {
        if (!AuthService.isAuthenticated()) {
          $state.go('auth.login');
        }
        $ctrl.user = AuthService.getUser();

        $ctrl.isSubmitted = false;
    }

    // Create a room object with user info and send the information to the backend
    this.createRoom = function(room) {
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

            var newRoom = RoomModel.New();
            newRoom.save({
                name: room.name,
                gameType: room.type,
                rounds: [],
                members: [],
                teams: [],
                manager: null
            })
            .then(function(newRoom) {
                var manager = MemberModel.New();
                manager.save({
                    name: $ctrl.user.name,
                    room: newRoom,
                    team: null,
                    isManager: true,
                    user: $ctrl.user
                })
                .then(function(manager) {
                    newRoom.save({
                        members: [manager],
                        manager: manager
                    })
                    .then(function(response) {
                        $state.go('room', {
                            id: newRoom.id
                        });
                    })
                })
            })
        }

    };

}

NewRoomController.$inject = ['AuthService', 'RoomModel', 'MemberModel', '$window', '$state'];
angular.module('components.newRoom')
    .controller('NewRoomController', NewRoomController);
