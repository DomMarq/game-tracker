const round = {
    templateUrl: './round.html',
    controller: 'RoundController',
    bindings: {
        round: '<'
    }
};

// round Component with Routing (Routed / Stateful)
angular.module('components.rounds')
    .component('round', round);