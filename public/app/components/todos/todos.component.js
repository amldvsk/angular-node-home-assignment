(function(){
  'use strict';


  var TodosController = function(API, Auth, $scope) {


    this.$onInit = function () {
      this.uid = Auth.isAuthenticated();
      this.todos = [];
      var self = this;
      if( this.uid ) {
        API.getTodos(this.uid).then(function(result) {
          self.todos = result.data;
        });
      }

      this.filterTodos = null;

      $scope.$on('newTask', function(event, task) {
        self.todos.push(task.task);
      });

      $scope.$on('tokenCreated', function(event, task) {
        self.uid = Auth.isAuthenticated();
      });

    };





    this.setTodoAsDone = function(todoId) {
      API.setTodoDone(this.uid, todoId).then(function(result) {

      });
    }

    this.deleteTodo = function(todoId) {
      var self = this;
      API.deleteTodo(this.uid, todoId).then(function(result) {
        _.remove(self.todos, {
            id: todoId
        });
      });
    }

    this.todoEdit = function(todo) {
      API.editTodo(this.uid, todo).then(function(result) {

      });
    }

    this.getTodos = function() {
      if( this.filterTodos === 1 ) {
        return _.filter(this.todos, {done : false});
      } else if( this.filterTodos === 2 ) {
        return _.filter(this.todos, {done : true});
      }
      return this.todos;
    }


    this.$onChanges = function(changedObj) {
      if( changedObj.todosFilter ) {
        if( changedObj.todosFilter.currentValue !== changedObj.todosFilter.previousValue) {
          if( changedObj.todosFilter.currentValue !== 0 ) {
            this.filterTodos = changedObj.todosFilter.currentValue;
          } else {
            this.filterTodos = null;
          }
        }
      }
    }

  }


  var TodosComponent = {
    binding : {},
    templateUrl: templatePath + '/todos/todos.html',
    bindings : {
      todosFilter : '<',
    },
    controller : TodosController,
    controllerAs : 'todos',
    bindToController : true
  };

  angular.module('Todo').component('todos', TodosComponent);

}());
