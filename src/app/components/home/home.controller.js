function HomeController() {
  const $ctrl = this;
  $ctrl.$onInit = function() {
    $ctrl.exampleVariable = "GameTracker Home";
  }
}

angular.module('components.home').controller('HomeController', HomeController);
