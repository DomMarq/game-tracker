function RegisterController() {
  const $ctrl = this;

  $ctrl.$onInit = function() {
    $ctrl.error = null;
    $ctrl.user = {
      name: '',
      email: '',
      password: ''
    }
  }

  $ctrl.createUser = function(event) {
    AuthService.register(event.user);
  }
}

angular
    .module('components.auth')
    .controller('RegisterController', RegisterController);
