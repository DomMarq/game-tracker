function RoundsController($mdDialog) {
    var $ctrl = this;

    this.showAddRound = function(ev) {
        $mdDialog.show({
            // controller: AddRoundController,
            // templateUrl: './add-round/add-round.html',
            contentElement: '#addRoundDialog',
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application to prevent interaction outside of dialog
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });
    }
}

angular.module('components.rounds')
    .controller('RoundsController', RoundsController);