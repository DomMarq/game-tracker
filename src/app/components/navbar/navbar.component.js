const navbar = {
    templateUrl: './navbar.html',
    controller: 'navbarController'
};

// navbar Component with Routing (Routed / Stateful)
angular.module('components.navbar').component('navbar', navbar);
