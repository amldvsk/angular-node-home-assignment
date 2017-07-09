(function(){
  'use strict';


  var HeaderController = function() {
  }


  var HeaderComponent = {
    binding : {},
    templateUrl: templatePath + 'header/header.html',
    bindings : {},
    controller : HeaderController,
    controllerAs : 'header',
    bindToController : true
  };

  angular.module('Todo').component('header', HeaderComponent);

}());
