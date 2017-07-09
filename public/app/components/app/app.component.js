;(function(){
  'use strict';


  var AppController = function(Auth) {

    this.$onInit = function() {
      if( !Auth.isAuthenticated() ) {
        Auth.getToken();
      }
      this.filter = 0;
    }

    this.filterTasks = function(filter) {
      this.filter = filter;
    }

  }


  var AppComponent = {
    binding : {},
    templateUrl: templatePath + 'app/app.html',
    bindings : {},
    controller : AppController,
    controllerAs : 'app',
    bindToController : true
  };

  angular.module('Todo').component('app', AppComponent);

}());
