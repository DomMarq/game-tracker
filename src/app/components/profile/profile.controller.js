function ProfileController(AuthService, $state) {
    const $ctrl = this;
    $ctrl.$onInit = function() {

        if (!AuthService.isAuthenticated()) {
          $state.go('auth.login');
        }
        $ctrl.user = AuthService.getUser();
    }
}

ProfileController.$inject = ['AuthService', '$state'];
angular
    .module('components.profile')
    .controller('ProfileController', ProfileController);
