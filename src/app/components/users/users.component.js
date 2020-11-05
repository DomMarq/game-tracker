const users = {
    templateUrl: './users.html',
    controller: 'UsersController',
    bindings: {
        users: '<',
        roomInfo: '<'
    }
};

// team Component with Routing (Routed / Stateful)
angular.module('components.users')
    .component('users', users);
