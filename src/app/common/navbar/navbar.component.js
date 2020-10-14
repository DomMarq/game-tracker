const navbar = {
    templateUrl: './navbar.html',
    controller: 'NavbarController',
    bindings: {
      username: '<'
    }
};

// navbar Component with Routing (Routed / Stateful)
angular
  .module('common')
  .component('navbar', navbar);
