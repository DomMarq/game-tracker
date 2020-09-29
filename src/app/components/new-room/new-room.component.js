const newRoom = {
    templateUrl: './new-room.html',
    controller: 'NewRoomController'
};

// NewRoom Component with Routing (Routed / Stateful)
angular.module('components.newRoom').component('newRoom', newRoom);
