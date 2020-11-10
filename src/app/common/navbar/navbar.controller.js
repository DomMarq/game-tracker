function NavbarController(AuthService) {

  const $ctrl = this;
  $ctrl.$onInit = function() {
      $ctrl.username = '';
      if (AuthService.isAuthenticated()) {
        $ctrl.username = 'Logged in as: ' + AuthService.getUser().username;
      } else {
        $ctrl.username = 'Not logged in';
      }
  }

  $ctrl.$onChanges = function(changes) {
      if (AuthService.isAuthenticated()) {
        $ctrl.username = 'Logged in as: ' + AuthService.getUser().username;
      } else {
        $ctrl.username = 'Not logged in';
      }
  }
};

NavbarController.$inject = ['AuthService'];
angular.module('common').controller('NavbarController', NavbarController);
