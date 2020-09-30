const rnchange = {
    templateUrl: './rnchange.html',
    controller: 'RoomNameChangeController',
    bindings: {
        room: '<',
        onUpdate: '&'
    }
};

angular.module('components.rnchange')
    .component('rnchange', rnchange);
