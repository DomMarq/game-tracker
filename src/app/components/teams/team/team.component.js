const team = {
    templateUrl: './team.html',
    controller: 'TeamController',
    bindings: {
        team: '<'
    }
};

// team Component with Routing (Routed / Stateful)
angular.module('components.teams')
    .component('team', team);