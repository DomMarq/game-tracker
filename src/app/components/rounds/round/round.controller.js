function RoundController(RoundModel) {
    var $ctrl = this;
    $ctrl.isDeleted = false;

    $ctrl.$onInit = function() {
        console.log($ctrl.round);
        $ctrl.dataKeys = Object.keys($ctrl.round.customData);
        $ctrl.columns = 4 + $ctrl.dataKeys.length;
        $ctrl.flexSize = Math.floor(97 / $ctrl.columns);
        $ctrl.customFlexSize = $ctrl.flexSize * $ctrl.dataKeys.length;
        $ctrl.innerCustomFlexSize = Math.floor(100 / $ctrl.dataKeys.length);
    };

    $ctrl.deleteRound = function() {
        $ctrl.isDeleted = true;
        RoundModel.getById($ctrl.round.id)
            .then(function(result) {
                result.destroy()
                    .then((deletedRound) => {
                        $ctrl.roundDelete({
                            round: $ctrl.deletedRound
                        });
                    }, (error) => {
                        $ctrl.isDeleted = false;
                    });
            });
    };
}
RoundController.$inject = ['RoundModel'];
angular.module('components.rounds')
    .controller('RoundController', RoundController);