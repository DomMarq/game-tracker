function RoomController(TeamModel, RoundModel, $location, $mdDialog) {
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
    };

    this.showQR = function(ev) {
        $mdDialog.show({
            contentElement: '#qrDialog',
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application to prevent interaction outside of dialog
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });
    };
}

RoomController.$inject = ['TeamModel', 'RoundModel', '$location', '$mdDialog'];
angular
    .module('components.room')
    .controller('RoomController', RoomController);