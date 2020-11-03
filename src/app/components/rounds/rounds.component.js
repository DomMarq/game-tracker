const rounds = {
    templateUrl: './rounds.html',
    controller: 'RoundsController',
    bindings: {
        rounds: '<',
        teams: '<'
    }
};

// round Component with Routing (Routed / Stateful)
angular.module('components.rounds')
    .component('rounds', rounds);