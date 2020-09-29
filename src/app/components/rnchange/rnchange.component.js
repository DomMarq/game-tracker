const rnchange = {
    templateUrl: './rnchange/rnchange.html',
    controller: 'RoomNameChangeController',
    bindings: {
        room: '<',
        onUpdate: '&'
    }
};

angular.module('components.rnchange').component('rnchange', rnchange);
