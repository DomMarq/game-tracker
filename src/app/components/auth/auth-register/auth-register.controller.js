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

    $ctrl.createUser = function(event) {
        console.log(event);
        AuthService.register(event);
    }
}

RegisterController.$inject = ['AuthService'];
angular
    .module('components.auth')
    .controller('RegisterController', RegisterController);