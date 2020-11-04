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

    this.isReadable = function(obj) {
        console.log(obj.getACL());
        return obj.getACL()
            .getReadAccess(Parse.User.current());
    };

    this.isAdmin = function(obj) {
        return obj.getACL()
            .getWriteAccess(Parse.User.current());
    }

    this.setAdmin = function(obj) {
        obj.setACL(new Parse.ACL(
            Parse.User.current()));
        obj.save();
    };

    this._getUserByEmail = function(email) {
        new Parse.Query(new Parse.User())
            // .include('email')
            .equalTo('email', email)
            .find()
            .then(result => {
                return Promise.resolve(result);
            })
            .catch(error => Promise.reject(error));
    };

    this.addUserPerms = function(obj, email) {
        this._getUserByEmail(email)
            .then(result => {
                var acl = obj.getACL()
                    .setReadAccess(result);
            });
    };
}

angular
    .module('components.auth')
    .service('AuthService', AuthService);