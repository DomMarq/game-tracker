function LoginController() {
  const $ctrl = this;

  $ctrl.$onInit = function() {
    $ctrl.user = {
      name: '',
      email: '',
      password: ''
    }
  }

  $ctrl.loginUser = function(event) {
    AuthService.login(event.user);
  }
}

angular
    .module('components.auth')
    .controller('LoginController', LoginController);
