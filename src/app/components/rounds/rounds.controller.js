function RoundsController($mdDialog, RoundModel, RoomModel) {
    var $ctrl = this;
    console.log($ctrl.roomInfo);

    $ctrl.$onInit = function() {
        console.log(RoomModel.data);
        $ctrl.roomInfo = RoomModel.data;
    }

    this.showAddRound = function(ev) {
        $mdDialog.show({
            contentElement: '#addRoundDialog',
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application to prevent interaction outside of dialog
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });
    };


    this.createRound = function(round) {
        if (round == undefined) {
            $ctrl.creationMessage =
                "There was an issue. Please try again.";
            $ctrl.newRoundFormSubmission = true;
        } else if (round.winnerScore < round.loserScore || round.loser ===
            round.winner) {
            $ctrl.creationMessage =
                "There was an issue. Please try again.";
            $ctrl.formSubmission = true;
        } else {
            $ctrl.isSubmitted = true;
            // var roundJson = angular.toJson(round);
            // console.log(roundJson);

            var newRound = RoundModel.New();
            newRound.save({
                    winner: round.winner,
                    loser: round.loser,
                    winnerScore: round.winnerScore,
                    loserScore: round.loserScore,
                    room: $ctrl.roomInfo
                })
                .then((newRound) => {
                    $ctrl.rounds.unshift(newRound);
                    $mdDialog.hide();
                    RoundModel.getByRoom($ctrl.roomInfo)
                        .then(function(result) {
                            $ctrl.rounds = result;
                        });
                });
        }
    };

    this.roundDelete = function(event) {
        RoundModel.getByRoom($ctrl.roomInfo)
            .then(function(result) {
                $ctrl.rounds = result;
            });
    };
}

RoundsController.$inject = ['$mdDialog', 'RoundModel', 'RoomModel'];
angular.module('components.rounds')
    .controller('RoundsController', RoundsController);