const member = {
    templateUrl: './member.html',
    controller: 'MemberController',
    bindings: {
        member: '<'
    }
};

// team Component with Routing (Routed / Stateful)
angular.module('components.members')
    .component('member', member);
