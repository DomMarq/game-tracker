function RegisterController(AuthService) {
    const $ctrl = this;

    $ctrl.$onInit = function() {
        $ctrl.error = null;
        $ctrl.user = {
            username: '',
            email: '',
            password: ''
        }
    }

    $ctrl.createUser = function(user) {
        console.log(user);
        AuthService.register(user);
    }
}

RegisterController.$inject = ['AuthService'];
angular
    .module('components.auth')
    .controller('RegisterController', RegisterController);