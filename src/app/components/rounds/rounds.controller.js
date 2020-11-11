function RoundsController($mdDialog, RoundModel, RoomModel) {
    var $ctrl = this;

    $ctrl.$onInit = function() {
        // console.log(RoomModel.data);
        $ctrl.dataKeys = Object.keys($ctrl.room.customData);
        $ctrl.columns = 4 + $ctrl.dataKeys.length;
        $ctrl.flexSize = Math.floor(97 / ($ctrl.columns));
        $ctrl.customFlexSize = $ctrl.flexSize * $ctrl.dataKeys.length;
        $ctrl.innerCustomFlexSize = Math.floor(100 / $ctrl.dataKeys.length);

    }

    $ctrl.$doCheck = function() {
        $ctrl.dataKeys = Object.keys($ctrl.room.customData);
        $ctrl.columns = 4 + $ctrl.dataKeys.length;
        $ctrl.flexSize = Math.floor(97 / ($ctrl.columns));
        $ctrl.customFlexSize = $ctrl.flexSize * $ctrl.dataKeys.length;
        $ctrl.innerCustomFlexSize = Math.floor(100 / $ctrl.dataKeys.length);
    };

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
                "Invalid input. Please try again.";
            $ctrl.formSubmission = true;
        } else {
            $ctrl.isSubmitted = true;
            // var roundJson = angular.toJson(round);
            // console.log(roundJson);

            var newRound = RoundModel.New();
            for (let [key, value] of Object.entries(round.customData)) {
                if (!value) {
                    round.customData = '-';
                }
            }
            newRound.save({
                    winner: round.winner,
                    loser: round.loser,
                    winnerScore: round.winnerScore,
                    loserScore: round.loserScore,
                    room: $ctrl.room,
                    customData: round.customData
                })
                .then((newRound) => {
                    $ctrl.rounds.unshift(newRound);
                    $mdDialog.hide();
                    RoundModel.getByRoom($ctrl.room)
                        .then(function(result) {
                            $ctrl.rounds = result;
                        });
                });
        }
        round = {};
    };

    this.roundDelete = function(event) {
        RoundModel.getByRoom($ctrl.room)
            .then(function(result) {
                $ctrl.rounds = result;
            });
    };
}

RoundsController.$inject = ['$mdDialog', 'RoundModel', 'RoomModel'];
angular.module('components.rounds')
    .controller('RoundsController', RoundsController);