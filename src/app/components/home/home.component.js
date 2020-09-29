const home = {
    templateUrl: './home.html',
    controller: 'HomeController'
};

// Home Component with Routing (Routed / Stateful)
angular.module('components.home')
    .component('home', home)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/',
            component: 'home'
        });
    });
