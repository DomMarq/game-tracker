const profile = {
    templateUrl: './profile.html',
    controller: 'ProfileController'
};

// Home Component with Routing (Routed / Stateful)
angular.module('components.profile')
    .component('profile', profile)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('profile', {
            parent: 'app',
            url: '/profile',
            component: 'profile'
        });
    });
