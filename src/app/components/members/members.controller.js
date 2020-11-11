function MembersController(AuthService, $mdDialog, MemberModel, TeamModel, RoomModel) {
    const $ctrl = this;

    $ctrl.$onInit = function() {
        $ctrl.roomInfo = RoomModel.data;
        $ctrl.user = AuthService.getUser();
        console.log($ctrl.members);
        console.log($ctrl.roomInfo);
    }

    $ctrl.switchTeam = function(ev) {
        // get team that was clicked on ($ctrl.team)
        // get user's current member object (query)
        MemberModel.getByUserandRoom($ctrl.user, $ctrl.roomInfo)
            .then(function(newMember) {
                console.log(newMember);
                newMember = newMember[0];
                $ctrl.oldTeam = null;
                if (newMember.team) {
                    $ctrl.oldTeam = newMember.team;
                }
                $ctrl.team.members.push(newMember);
                $ctrl.team.save({
                    members: $ctrl.team.members
                })
                .then(function(currTeam) {
                    newMember.save({
                        team: currTeam
                    })
                    .then(function(response2) {
                        if ($ctrl.oldTeam) {
                            let index = $ctrl.oldTeam.members.indexOf(newMember);
                            if (index > -1) {
                                $ctrl.oldTeam.members.splice(index, 1);
                                $ctrl.oldTeam.save({
                                    members: $ctrl.oldTeam.members
                                })
                                .then(function(response3) {
                                    console.log("success");
                                })
                            }
                        }
                    })
                })
            })

    }

}

MembersController.$inject = ['AuthService', '$mdDialog', 'MemberModel', 'TeamModel', 'RoomModel'];
angular.module('components.members')
    .controller('MembersController', MembersController);
