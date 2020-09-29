function RoomNameChangeController() {
    this.$onChanges = function(changes) { // received when parent (room) changes data
        if (changes.room) {
            this.room = angular.copy(this.room); // breaks pass by reference
        }
    };
    this.updateRoomName = function() { // called when submit button is pressed
        this.onUpdate({ // outgoing bound event
            $event: {
                room: this.room // value to pass back
            }
        });
    }
}
