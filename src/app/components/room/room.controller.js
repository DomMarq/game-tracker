function RoomController(TeamModel, RoundModel, AuthService) {
    const $ctrl = this;
    $ctrl.$onInit = function() {
        $ctrl.room = {
            name: "",
            type: "",
            teams: {}
        };
        $ctrl.roomLoaded = false;
        TeamModel.getByRoom($ctrl.roomInfo)
            .then(function(result) {
                $ctrl.teams = result;
                $ctrl.teamsLoaded = true;
            });
        RoundModel.getByRoom($ctrl.roomInfo)
            .then(function(result) {
                $ctrl.rounds = result;
                $ctrl.roundsLoaded = true;
            });
        $ctrl.loaded = true;
        $ctrl.isAdmin = AuthService.isAdmin($ctrl.roomInfo);
    };

    $ctrl.addUser = function(user) {
        var groupACL = $ctrl.roomInfo.getACL();
        groupACL.setReadAccess(user, true);

        $ctrl.roomInfo.setACL(groupACL);
        $ctrl.roomInfo.save();
    };

    $ctrl.kickUser = function(user) {
        // TODO: Add a check to make sure that [user] is not the admin
        var groupACL = $ctrl.roomInfo.getACL();
        groupACL.setReadAccess(user, false);
        groupACL.setWriteAccess(user, false);

        $ctrl.roomInfo.setACL(groupACL);
        $ctrl.roomInfo.save();
    };
}

RoomController.$inject = ['TeamModel', 'RoundModel', 'AuthService'];
angular
    .module('components.room')
    .controller('RoomController', RoomController);