function RoomNameChangeController() {
    const $ctrl = this;
    $ctrl.$onInit = function() {

    }

    $ctrl.$onChanges = function(changes) { // received when parent (room) changes data
      if (changes.room) {
          this.room = angular.copy(this.room); // breaks pass by reference
      }
    };  
}

angular
  .module('components.rnchange')
  .controller('RoomNameChangeController', RoomNameChangeController);
