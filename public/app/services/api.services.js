;(function() {
  'use strict';

    function apiService($http) {
      this.getTodos = function(uid) {
        return $http.get('/user/'+uid+'/tasks');
      }

      this.addTodo = function(uid, todo) {
        return $http.post('/user/'+uid+'/tasks', todo);
      }

      this.setTodoDone = function(uid, todo) {
        return $http.patch('/user/'+uid+'/tasks/'+todo+'/done');
      }

      this.deleteTodo = function(uid, todo) {
        return $http.delete('/user/'+uid+'/tasks/'+todo);
      }

      this.editTodo = function(uid, todo) {
        return $http.put('/user/'+uid+'/tasks/'+todo.id, todo);
      }

    }


    angular.module('Todo').service('API', apiService);

}())
