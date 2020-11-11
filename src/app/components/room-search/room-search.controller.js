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
    this.joinRoom = function(code, nickname) {
        if (code == undefined) {
            $ctrl.roomSearchJoinMessage =
                "There was an issue. Please try again.";
            $ctrl.roomSearchFormSubmission = true;
        } else {
            $ctrl.isSubmitted = true;

            RoomModel.getById(code)
                .then(function(room) {
                    MemberModel.getByUserandRoom($ctrl.user, room)
                        .then(function(member) {
                            if (member.length) {
                                $state.go('room', {
                                    id: code
                                });
                            } else {
                                var newMember = MemberModel.New();
                                newMember.save({
                                    name: nickname,
                                    room: room,
                                    team: null,
                                    isManager: false,
                                    user: $ctrl.user
                                })
                                .then(function(newMember) {
                                    room.members.push(newMember);
                                    room.save({
                                        members: room.members
                                    })
                                    .then(function(response) {
                                        $state.go('room', {
                                            id: code
                                        });
                                    })
                                })
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                            $ctrl.isSubmitted = false;
                        })
                })
                .catch(function(error) {
                    console.log(error);
                    $ctrl.roomSearchJoinMessage =
                        "There was an issue. Please try again.";
                    $ctrl.roomSearchFormSubmission = true;
                    $ctrl.isSubmitted = false;
                })
        }
    }
}

RoomSearchController.$inject = ['AuthService', 'RoomModel', 'MemberModel', '$window', '$state'];
angular.module('components.roomSearch')
    .controller('RoomSearchController', RoomSearchController);
