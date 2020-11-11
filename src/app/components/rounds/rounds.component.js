const rounds = {
    templateUrl: './rounds.html',
    controller: 'RoundsController',
    bindings: {
        rounds: '<',
        teams: '<',
        room: '<'
    }
};

// round Component with Routing (Routed / Stateful)
angular.module('components.rounds')
    .component('rounds', rounds);