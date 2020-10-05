const room = {
    templateUrl: './room.html',
    controller: 'RoomController',
    bindings: {
        roomInfo: '<',
        roomTeams: '<'
    }
};

// Home Component with Routing (Routed / Stateful)
angular.module('components.room')
    .component('room', room)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('room', {
            parent: 'app',
            url: '/room',
            component: 'room',
            resolve: {
                roomInfo: function(RoomModel) {
                    return RoomModel.getById('4xZV4yg6EE');
                }
            }
        });
    });