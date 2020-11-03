function RoomController(TeamModel, RoundModel, $location) {
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
        $ctrl.url = $location.absUrl();
    }
}

RoomController.$inject = ['TeamModel', 'RoundModel', '$location'];
angular
    .module('components.room')
    .controller('RoomController', RoomController);