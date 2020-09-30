function RoomNameChangeController() {
    const $ctrl = this;
    $ctrl.$onInit = function() {
      $ctrl.updateRoomName = updateRoomName;
    }

    $ctrl.$onChanges = function(changes) { // received when parent (room) changes data
      if (changes.room) {
          this.room = angular.copy(this.room); // breaks pass by reference
      }
    };

    function updateRoomName() { // called when submit button is pressed
      this.onUpdate({ // outgoing bound event
          $event: {
              room: this.room // value to pass back
          }
      });
    }
}

angular
  .module('components.rnchange')
  .controller('RoomNameChangeController', RoomNameChangeController);
