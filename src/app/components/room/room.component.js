const room = {
    templateUrl: './room.html',
    controller: 'RoomController',
    bindings: {
        roomInfo: '<'
    }
};

// Home Component with Routing (Routed / Stateful)
angular.module('components.room')
    .component('room', room)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('room', {
            parent: 'app',
            url: '/room/:id',
            params: {
                id: '4xZV4yg6EE'
            },
            component: 'room',
            resolve: {
                roomInfo: function(RoomModel, $transition$) {
                    var params = $transition$.params();
                    return RoomModel.getById(params.id);
                }
            }
        });
    });
