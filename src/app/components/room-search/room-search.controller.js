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
                .then(function(result) {
                    // check if user is already a member of the room
                    console.log("Result: " + result);
                    console.log(result);
                    console.log(result.members);
                    for (var member of result.members) {
                        console.log("Member User");
                        console.log(member.user);
                        console.log("Ctrl User");
                        console.log($ctrl.user);
                        if (member.user == $ctrl.user) {
                            $state.go('room', {
                                id: code
                            });
                            break; // maybe not necessary
                        }
                    }

                    // user not found yet, create a new member and add them to the room
                    var newMember = MemberModel.New();
                    newMember.save({
                        name: $ctrl.user.name,
                        isManager: false,
                        user: $ctrl.user
                    })
                    .then(function(newMember) {
                        result.members.push(newMember);
                        result.set('members', result.members);
                        $state.go('room', {
                            id: code
                        });
                    })
                })/*.catch(function() {
                    console.log("Invalid code input.");
                    $ctrl.roomSearchJoinMessage =
                        "No room with this code was found. Please try again.";
                    $ctrl.roomSearchFormSubmission = true;
                    $ctrl.isSubmitted = false;
                })*/
        }
    }

}

RoomSearchController.$inject = ['AuthService', 'RoomModel', 'MemberModel', '$window', '$state'];
angular.module('components.roomSearch')
    .controller('RoomSearchController', RoomSearchController);
