const navbar = {
    templateUrl: './navbar.html',
    controller: 'NavbarController'
};

// navbar Component with Routing (Routed / Stateful)
angular.module('common').component('navbar', navbar);
