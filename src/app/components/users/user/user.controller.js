function UserController(UserModel) {
    const $ctrl = this;
    $ctrl.isDeleted = false;
}

UserController.$inject = ['UserModel'];
angular.module('components.users')
    .controller('UserController', UserController);
