;(function(){

  function config($httpProvider) {
    $httpProvider.interceptors.push(['$q', function ($q) {
       return {
           'request': function (config) {
               config.headers = config.headers || {};
               if (localStorage.getItem('token')) {
                   config.headers.Authorization = localStorage.getItem('token');
               }
               return config;
           },
           'responseError': function (response) {
               if (response.status === 401 || response.status === 403) {
                  //  $location.path('/signin');
               }
               return $q.reject(response);
           }
       };
    }]);
  }

  angular.module('Todo').config(config);
}());
