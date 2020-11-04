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
                roomInfo: function(RoomModel, $transition$,
                    $state, AuthService) {
                    var params = $transition$.params();
                    // console.log(RoomModel.getById(params.id));
                    return RoomModel.getById(params.id)
                        .catch((error) => {
                            console.log(error);
                            if (error.code === 101) {
                                if (AuthService
                                    .isAuthenticated) {
                                    $state.go('home');
                                } else {
                                    $state.go('profile');
                                }
                            }
                        });
                }
            }
        });
    });