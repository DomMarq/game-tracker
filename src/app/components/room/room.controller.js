function RoomController(TeamModel) {
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
                console.log($ctrl.teams);
            });
    }
}

RoomController.$inject = ['TeamModel'];
angular
    .module('components.room')
    .controller('RoomController', RoomController);