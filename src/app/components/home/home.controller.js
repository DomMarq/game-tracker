function HomeController() {
  const $ctrl = this;
  $ctrl.$onInit = function() {
    $ctrl.exampleVariable = "I am the home component";
  }
}

angular.module('components.home').controller('HomeController', HomeController);
