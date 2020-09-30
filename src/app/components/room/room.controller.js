function RoomController() {
    const $ctrl = this;
    $ctrl.$onInit = function() {
      $ctrl.room = {
          name: "",
          type: "",
          teams: {}
      };
      $ctrl.roomLoaded = false;
    }

}

angular
  .module('components.room')
  .controller('RoomController', RoomController);
