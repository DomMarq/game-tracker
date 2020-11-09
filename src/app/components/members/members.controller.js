function MembersController($mdDialog, MemberModel, TeamModel, RoomModel) {
    const $ctrl = this;

    $ctrl.$onInit = function() {
        console.log(RoomModel.data);
        $ctrl.roomInfo = RoomModel.data;
    }

}

MembersController.$inject = ['$mdDialog', 'MemberModel', 'TeamModel', 'RoomModel'];
angular.module('components.members')
    .controller('MembersController', MembersController);
