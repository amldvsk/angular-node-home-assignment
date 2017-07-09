(function(){
  'use strict';


  var AddTodoController = function(API, Auth, $rootScope, $scope) {

    this.$onInit = function(){
      var self = this;
      this.uid = Auth.isAuthenticated();
      $scope.$on('tokenCreated', function(event, task) {
        self.uid = Auth.isAuthenticated();
      });
    }

    this.addTodo = function() {
      var self = this;
      API.addTodo(this.uid, {
        content : self.task,
      }).then(function(result) {
        $rootScope.$broadcast('newTask', { task : result.data });
      });

      self.task = null;
    }
  }


  var AddTodoComponent = {
    binding : {},
    templateUrl: templatePath + '/addTodo/addTodo.html',
    bindings : {},
    controller : AddTodoController,
    controllerAs : 'addTodo',
    bindToController : true
  };

  angular.module('Todo').component('addTodo', AddTodoComponent);

}());
