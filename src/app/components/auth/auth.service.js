function AuthService(Parse) {
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
        const user = await Parse.User.logIn(user.username, user.password);
        return user;
    };

    this.register = function(newUser) {
        var user = new Parse.User();
        user.set("username", newUser.username);
        user.set("password", newUser.password);
        user.set("email", newUser.email);

        try {
            await user.signUp();
        } catch (error) {
            alert("Error: " + error.code + " " + error.message);
        }
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