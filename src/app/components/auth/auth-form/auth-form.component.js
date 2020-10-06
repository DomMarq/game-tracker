const authForm = {
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
  .component('authForm', authForm);
