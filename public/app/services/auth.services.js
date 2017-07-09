;(function() {
  'use strict';

    function authService($http, $rootScope) {
      this.isAuthenticated = function() {
        return localStorage.getItem('token') || false;
      }

      this.getToken = function() {
        $http.get('/user/create').then(function(result) {
          localStorage.setItem('token', result.data.token);
          $rootScope.$broadcast('tokenCreated');
        });
      }

    }


    angular.module('Todo').service('Auth', authService);

}())
