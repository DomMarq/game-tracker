function RoomSearchController(AuthService, RoomModel, MemberModel, $stateProvider, $state) {
    const $ctrl = this;
    $ctrl.$onInit = function() {
        if (!AuthService.isAuthenticated()) {
          $state.go('auth.login');
        }
        $ctrl.user = AuthService.getUser();

        $ctrl.isSubmitted = false;
    }

    // Create a room object with user info and send the information to the backend
    this.joinRoom = function(code) {
        if (code == undefined) {
            $ctrl.roomSearchJoinMessage =
                "There was an issue. Please try again.";
            $ctrl.roomSearchFormSubmission = true;
        } else {
            $ctrl.isSubmitted = true;
            RoomModel.getById(code)
                .then(function(room) {
                    // check if user is already a member of the room
                    for (var member of room.members) {
                        MemberModel.getById(member.id)
                            .then(function(member) {
                                console.log("Member");
                                console.log(member);
                                console.log("Member User");
                                console.log(member.user.id);
                                console.log("Control User");
                                console.log($ctrl.user.id);
                                if (member.user.id == $ctrl.user.id) {
                                    $state.go('room', {
                                        id: code
                                    });
                                    console.log("Gotcha!");
                                    return;
                                }
                            })
                    }
                    console.log("No sir");
                });

            // user not found yet, create a new member and add them to the room
            // var newMember = MemberModel.New();
            // newMember.save({
            //     name: $ctrl.user.name,
            //     room: room,
            //     team: null,
            //     isManager: false,
            //     user: $ctrl.user
            // })
            // .then(function(newMember) {
            //     room.members.push(newMember);
            //     room.set('members', room.members);
            //     $state.go('room', {
            //         id: code
            //     });
            // })
        }
                // .catch(function(error) {
                //     console.log("Invalid code input.");
                //     $ctrl.roomSearchJoinMessage =
                //         "No room with this code was found. Please try again.";
                //     $ctrl.roomSearchFormSubmission = true;
                //     $ctrl.isSubmitted = false;
                // })
    }
}

RoomSearchController.$inject = ['AuthService', 'RoomModel', 'MemberModel', '$window', '$state'];
angular.module('components.roomSearch')
    .controller('RoomSearchController', RoomSearchController);
