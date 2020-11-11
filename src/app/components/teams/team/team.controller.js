function TeamController($mdDialog, TeamModel, MemberModel) {
    const $ctrl = this;
    $ctrl.isDeleted = false;

    this.$onInit = function() {
        MemberModel.getByTeam($ctrl.team)
            .then(function(result) {
                $ctrl.members = result;
                $ctrl.membersLoaded = true;
            })
    }

    this.showTeamEdit = function(ev) {
        $mdDialog.show({
            contentElement: '#editTeamDialog',
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application to prevent interaction outside of dialog
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });
    }

    this.editTeamName = function(name) {
        let team = $ctrl.team;
        // error message on failure case
        if (name == undefined) {
            $ctrl.creationMessage = "There was an issue. Please try again.";
            $ctrl.newTeamEditFormSubmission = true;
        } else { // success case - get team Parse object and edit it
            $ctrl.isSubmitted = true;

            TeamModel.getById(team.id)
                .then(function(result) {
                    result.set('name', name);
                    result.save().then((response) => {
                        $mdDialog.hide();
                        TeamModel.getByRoom($ctrl.roomInfo)
                            .then(function(result) {
                                $ctrl.teams = result;
                            })
                    })
                })
        }
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

TeamController.$inject = ['$mdDialog', 'TeamModel', 'MemberModel'];
angular.module('components.teams')
    .controller('TeamController', TeamController);
