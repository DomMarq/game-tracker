function UsersController($mdDialog, TeamModel, RoomModel) {
    const $ctrl = this;

    $ctrl.$onInit = function() {
        console.log(RoomModel.data);
        $ctrl.roomInfo = RoomModel.data;
    }

}

UsersController.$inject = ['$mdDialog', 'TeamModel', 'RoomModel'];
angular.module('components.users')
    .controller('UsersController', UsersController);
