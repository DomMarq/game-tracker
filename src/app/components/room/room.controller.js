function RoomController(TeamModel, RoundModel) {
    const $ctrl = this;
    $ctrl.$onInit = function() {
        $ctrl.loaded = false;
        TeamModel.getByRoom($ctrl.roomInfo)
            .then(function(result) {
                $ctrl.roomInfo.teams = result;
                $ctrl.teamsLoaded = true;
            });
        RoundModel.getByRoom($ctrl.roomInfo)
            .then(function(result) {
                $ctrl.rounds = result;
                $ctrl.roundsLoaded = true;
            });
        $ctrl.loaded = true;
    }
}

RoomController.$inject = ['TeamModel', 'RoundModel'];
angular
    .module('components.room')
    .controller('RoomController', RoomController);
