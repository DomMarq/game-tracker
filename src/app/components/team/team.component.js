const team = {
    templateUrl: './team.html',
    controller: 'TeamController',
    bindings: {
        team: '<'
    }
};

// team Component with Routing (Routed / Stateful)
angular.module('components.team').component('team', team);
