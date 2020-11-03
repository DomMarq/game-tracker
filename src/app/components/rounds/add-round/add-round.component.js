const addRound = {
    templateUrl: './add-round.html',
    controller: 'AddRoundController',
    bindings: {
        teams: '<'
    }
};

// round Component with Routing (Routed / Stateful)
angular.module('components.rounds')
    .component('addRound', addRound);