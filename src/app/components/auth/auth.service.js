function AuthService() {
  var authData = null;

  function storeAuthData(response) {
    authData = response;
    return authData;
  }

  function onSignIn(user) {
    authData = user;
    return auth.$requireSignIn();
  }

  function clearAuthData() {
    authData = null;
  }

  this.login = function (user) {
    return auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then(storeAuthData);
  };

  this.register = function (newUser) {
    var user = new Parse.User();
    user.set("username", newUser.username);
    user.set("password", newUser.password);
    user.set("email", newUser.email);

    try {
      await user.signUp();
    } catch(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  };

  this.logout = function () {
    return auth
      .$signOut()
      .then(clearAuthData);
  };

  this.requireAuthentication = function () {
    return auth
      .$waitForSignIn().then(onSignIn);
  };

  this.isAuthenticated = function () {
    return !!authData;
  };

  this.getUser = function () {
    if (authData) {
      return authData;
    }
  };

}

angular
  .module('components.auth')
  .service('AuthService', AuthService);
