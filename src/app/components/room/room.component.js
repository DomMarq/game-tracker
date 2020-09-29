const room = {
    templateUrl: './room.html',
    controller: 'RoomController'
};

// Home Component with Routing (Routed / Stateful)
angular.module('components.room')
    .component('room', room)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('room', {
            parent: 'app',
            url: '/room',
            component: 'room'
        });
    });
