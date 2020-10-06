const teams = {
    templateUrl: './teams.html',
    controller: 'TeamsController',
    bindings: {
        teams: '<'
    }
};

// team Component with Routing (Routed / Stateful)
angular.module('components.teams')
    .component('teams', teams);