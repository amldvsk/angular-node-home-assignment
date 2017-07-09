(function() {
  'use strict';


  window.templatePath = '/assets/app/components/';  
  angular.module('Todo', []);


  angular.element(document).ready(function() {
    angular.bootstrap(document, ['Todo']);
  });



}())
