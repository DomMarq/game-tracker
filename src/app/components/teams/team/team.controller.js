function TeamController(TeamModel) {
    const $ctrl = this;
}


TeamController.$inject = ['TeamModel'];
angular.module('components.teams')
    .controller('TeamController', TeamController);
