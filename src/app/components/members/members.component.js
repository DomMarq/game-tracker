const members = {
    templateUrl: './members.html',
    controller: 'MembersController',
    bindings: {
        members: '<',
        team: '<',
        roomInfo: '<'
    }
};

// team Component with Routing (Routed / Stateful)
angular.module('components.members')
    .component('members', members);
