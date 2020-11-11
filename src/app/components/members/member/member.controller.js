function MemberController(MemberModel) {
    const $ctrl = this;
    $ctrl.isDeleted = false;
}

MemberController.$inject = ['MemberModel'];
angular.module('components.members')
    .controller('MemberController', MemberController);
