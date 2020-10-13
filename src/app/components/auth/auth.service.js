function AuthService() {
    // var authData = null;

    function storeAuthData(response) {
        // authData = response;
        // return authData;
    }

    function onSignIn(user) {
        // authData = user;
        // return auth.$requireSignIn();
    }

    function clearAuthData() {
        Parse.User.logOut()
            .then(() => {
                var currentUser = Parse.User.current();
            });
    }

    this.login = function(user) {
        Parse.User.logIn(user.email, user.password)
            .then((user) => {
                // Do stuff after successful login
                console.log('Logged in user', user);
            })
            .catch(error => {
                console.error('Error while logging in user', error);
            })
    };

    this.register = function(newUser) {
        const user = new Parse.User()
        user.set('username', newUser.username);
        user.set('email', newUser.email);
        user.set('password', newUser.password);

        user.signUp()
            .then((user) => {
                console.log('User signed up', user);
            })
            .catch(error => {
                console.error('Error while signing up user', error);
            });
    };

    this.logout = function() {
        Parse.User.logOut()
            .then(() => {
                var currentUser = Parse.User.current();
            });
    };

    this.requireAuthentication = function() {
        // return auth
        //     .$waitForSignIn()
        //     .then(onSignIn);
    };

    this.isAuthenticated = function() {
        return Parse.User.current() ? true : false;
    };

    this.getUser = function() {
        return Parse.User.current();
    };

}

angular
    .module('components.auth')
    .service('AuthService', AuthService);
