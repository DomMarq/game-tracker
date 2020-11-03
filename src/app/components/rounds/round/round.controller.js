function RoundController(RoundModel) {
    var $ctrl = this;
    $ctrl.isDeleted = false;

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