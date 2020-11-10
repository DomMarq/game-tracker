const roomSearch = {
    templateUrl: './room-search.html',
    controller: 'RoomSearchController'
};

// NewRoom Component with Routing (Routed / Stateful)
angular
    .module('components.roomSearch')
    .component('roomSearch', roomSearch)
    .config(function($stateProvider) {
        $stateProvider.state('roomSearch', {
            parent: 'app',
            url: '/room-search',
            component: 'roomSearch'
        });
    });
