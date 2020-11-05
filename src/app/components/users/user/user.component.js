const user = {
    templateUrl: './user.html',
    controller: 'UserController',
    bindings: {
        user: '<'
    }
};

// team Component with Routing (Routed / Stateful)
angular.module('components.users')
    .component('user', user);
