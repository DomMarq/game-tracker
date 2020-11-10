function LoginController(AuthService) {
    const $ctrl = this;

    $ctrl.$onInit = function() {
        $ctrl.user = {
            username: '',
            email: '',
            password: ''
        }
    }

    $ctrl.loginUser = function(user) {
        console.log(user);
        AuthService.login(user);
    }
}

LoginController.$inject = ['AuthService'];
angular
    .module('components.auth')
    .controller('LoginController', LoginController);
