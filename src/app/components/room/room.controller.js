function RoomController(TeamModel, RoundModel, AuthService, $location, $mdDialog) {
    const $ctrl = this;
    $ctrl.$onInit = function() {
        $ctrl.room = {
            name: "",
            type: "",
            teams: {},
            members: []
        };
        $ctrl.roomLoaded = false;
        TeamModel.getByRoom($ctrl.roomInfo)
            .then(function(result) {
                $ctrl.teams = result;
                $ctrl.teamsLoaded = true;
            });
        RoundModel.getByRoom($ctrl.roomInfo)
            .then(function(result) {
                $ctrl.rounds = result;
                $ctrl.roundsLoaded = true;
            });
        $ctrl.loaded = true;
        $ctrl.isAdmin = AuthService.isAdmin($ctrl.roomInfo);
        if ($ctrl.isAdmin) $ctrl.users = Object.keys($ctrl.roomInfo
            .getACL()
            .permissionsById);
        if ($ctrl.users) console.log($ctrl.users);
    };

    $ctrl.addUser = function(user, admin) {
        var groupACL = $ctrl.roomInfo.getACL();
        console.log(groupACL);
        groupACL.setReadAccess(user.id, true);
        if (admin) groupACL.setWriteAccess(user.id, true);
        console.log(groupACL);
        $ctrl.roomInfo.setACL(groupACL);
        $ctrl.roomInfo.save();
        $mdDialog.hide();
    };

    $ctrl.kickUser = function(user) {
        // TODO: Add a check to make sure that [user] is not the admin
        var groupACL = $ctrl.roomInfo.getACL();
        groupACL.setReadAccess(user, false);
        groupACL.setWriteAccess(user, false);

        $ctrl.roomInfo.setACL(groupACL);
        $ctrl.roomInfo.save();
        $mdDialog.hide();
    };

    $ctrl.showPerms = function(ev) {
        $mdDialog.show({
            contentElement: '#permDialog',
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application to prevent interaction outside of dialog
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });

    };

    this.showQR = function(ev) {
        $mdDialog.show({
            contentElement: '#qrDialog',
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application to prevent interaction outside of dialog
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });
        $ctrl.url = $location.absUrl();
    };

RoomController.$inject = ['TeamModel', 'RoundModel', 'AuthService', '$location', '$mdDialog'];
angular
    .module('components.room')
    .controller('RoomController', RoomController);
