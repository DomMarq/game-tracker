const teams = {
    templateUrl: './teams.html',
    controller: 'TeamsController',
    bindings: {
        teams: '<',
        roomInfo: '<'
    }
};

// team Component with Routing (Routed / Stateful)
angular.module('components.teams')
    .component('teams', teams);
