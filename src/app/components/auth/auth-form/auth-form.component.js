const auth-form = {
  templateUrl: './auth-form.html',
  controller: 'AuthFormController',
  bindings: {
    user: '<',
    button: '@',
    onSubmit: '&'
  }
}

angular
  .module('components.auth')
  .component('auth-form', auth-form);
