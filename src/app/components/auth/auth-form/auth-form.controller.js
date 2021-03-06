function AuthFormController(AuthService, $state) {
    const $ctrl = this;

    $ctrl.$onInit = function() {
        if (AuthService.isAuthenticated()) {
          $state.go('home');
        }
        $ctrl.isRegister = ($ctrl.button === 'Sign Up & Create Account') ?
            true : false;
        $ctrl.isSubmitted = false;
    }

    $ctrl.submit = function() {
        $ctrl.onSubmit({
            user: $ctrl.user
        });
        $ctrl.isSubmitted = true;
        console.log($ctrl.user);
        // TODO: Send this to wherever the user was trying to go before.
        $state.go('home');
    }
}
AuthFormController.$inject = ['AuthService', '$state'];

angular
    .module('components.auth')
    .controller('AuthFormController', AuthFormController);
