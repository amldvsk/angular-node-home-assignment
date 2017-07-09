;(function() {
  'use strict';

  function authorizeProvider(Auth) {
    this.request = function(config) {
      //var isAuth = Auth.isAuthenticated();
      // return config.headers.authorization = isAuth;
    };
  }

  angular.module('Todo').service('authorize', authorizeProvider);

}());
