function RoomSearchController(AuthService, RoomModel, $stateProvider, $state) {
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
                    console.log(result);
                    var members = result.get('members');
                    console.log("Members: " + members);
                    members.push($ctrl.user);
                    result.set('members', members)
                        .then((response) => {
                            $state.go('room', {
                                id: code
                            });
                        })
                }).catch(function() {
                    console.log("Invalid code input.");
                    $ctrl.roomSearchJoinMessage =
                        "No room with this code was found. Please try again.";
                    $ctrl.roomSearchFormSubmission = true;
                    $ctrl.isSubmitted = false;
                })
        }
    }

}

RoomSearchController.$inject = ['AuthService', 'RoomModel', '$window', '$state'];
angular.module('components.roomSearch')
    .controller('RoomSearchController', RoomSearchController);
