function TeamsController($mdDialog, TeamModel, RoomModel) {
    const $ctrl = this;
    $ctrl.$onInit = function() {
        console.log(RoomModel.data);
        $ctrl.roomInfo = RoomModel.data;
    }

    this.showAddTeam = function(ev) {
        $mdDialog.show({
            contentElement: '#addTeamDialog',
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application to prevent interaction outside of dialog
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });
    };

    this.createTeam = function(team) {
        // error message on failure case
        if (team == undefined) {
            $ctrl.creationMessage = "There was an issue. Please try again.";
            $ctrl.newTeamFormSubmission = true;
        } else { // success case - create new team Parse object and add it
            $ctrl.isSubmitted = true;

            var newTeam = TeamModel.New();
            newTeam.save({
                name: team.name,
                users: team.users,
                wins: 0,
                losses: 0,
                room: $ctrl.roomInfo
            })
            .then((newTeam) => {
                $ctrl.teams.push(newTeam);
                $mdDialog.hide();
                TeamModel.getByRoom($ctrl.roomInfo)
                    .then(function(result) {
                        $ctrl.teams = result;
                    })
            })
        }
    }

    this.teamDelete = function(event) {
        TeamModel.getByRoom($ctrl.roomInfo)
            .then(function(result) {
                console.log($ctrl.teams);
                $ctrl.teams = result;
            });
    };
}

TeamsController.$inject = ['$mdDialog', 'TeamModel', 'RoomModel'];
angular.module('components.teams')
    .controller('TeamsController', TeamsController);
