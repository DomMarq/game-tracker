function MembersController($mdDialog, MemberModel, TeamModel, RoomModel) {
    const $ctrl = this;

    $ctrl.$onInit = function() {
        console.log($ctrl.members);
    }

}

MembersController.$inject = ['$mdDialog', 'MemberModel', 'TeamModel', 'RoomModel'];
angular.module('components.members')
    .controller('MembersController', MembersController);
