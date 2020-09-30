function RoomController() {
    const $ctrl = this;
    $ctrl.$onInit = function() {
      $ctrl.room = {
          name: "",
          type: "",
          teams: {}
      };
      $ctrl.roomLoaded = false;
      $ctrl.updateRoomName = updateRoomName;
    }

    function updateRoomName(event) {
        $ctrl.room = event.room;
    }

    // Load room information into room
    /*ExampleService.getRoomData().then(function(response) {
        $ctrl.room = response.data["Game1"];
        console.log($ctrl.room);
        console.log($ctrl.room.name);
        $ctrl.roomLoaded = true;
    })*/
}

angular
  .module('components.room')
  .controller('RoomController', RoomController);
