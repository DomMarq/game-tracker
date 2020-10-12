function AuthFormController() {
    const $ctrl = this;

    $ctrl.$onInit = function() {
        $ctrl.isRegister = ($ctrl.button === 'Sign Up & Create Account') ?
            true : false;
        $ctrl.isSubmitted = false;
    }

    $ctrl.submit = function() {
        this.onSubmit({
            $event: {
                user: $ctrl.user
            }
        });
        $ctrl.isSubmitted = true;
        console.log($ctrl.user);
        // $ctrl.onSubmit = $ctrl.user;
    }
}

angular
    .module('components.auth')
    .controller('AuthFormController', AuthFormController);