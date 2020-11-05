function TeamController(TeamModel) {
    const $ctrl = this;
    $ctrl.isDeleted = false;

    this.$onInit = function() {
        $ctrl.
    }

    this.deleteTeam = function() {
        $ctrl.isDeleted = true;
        TeamModel.getById($ctrl.team.id)
            .then(function(result) {
                result.destroy()
                    .then((deletedTeam) => {
                        $ctrl.teamDelete({
                            team: $ctrl.deletedTeam
                        });
                    }, (error) => {
                        $ctrl.isDeleted = false;
                    });
            });
    };
}

TeamController.$inject = ['TeamModel'];
angular.module('components.teams')
    .controller('TeamController', TeamController);
