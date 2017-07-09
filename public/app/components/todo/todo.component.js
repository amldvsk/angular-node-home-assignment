(function(){
  'use strict';


  var TodoController = function() {

    this.setTodoAsDone = function() {
      this.todoData.done = !this.todoData.done;
      this.todoDone({id : this.todoData.id});
    }


    this.deleteTodo = function() {
      this.todoDelete({id : this.todoData.id});
    }

    this.editTodo = function() {
      delete this.todoData['edit'];
      this.todoEdit({ todoItem : this.todoData });
    }

  }


  var TodoComponent = {
    binding : {},
    templateUrl: templatePath + '/todo/todo.html',
    bindings : {
      todoData : '=',
      todoDone : '&',
      todoDelete : '&',
      todoEdit : '&',
    },
    controller : TodoController,
    controllerAs : 'todo',
    bindToController : true
  };

  angular.module('Todo').component('todo', TodoComponent);

}());
