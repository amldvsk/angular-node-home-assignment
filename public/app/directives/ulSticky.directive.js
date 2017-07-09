(function(){
  'use strict';


  var ulStickyDirective = function() {
    return {
      link : function(scope, elem, attr) {
        var observer = new MutationObserver(function(mutations) {
        	elem[0].scrollTop = elem[0].scrollHeight;
        });

        var observerConfig = {
        	childList: true
        };

        observer.observe(elem[0], observerConfig);
      }
    };
  }

  angular.module('Todo').directive('ulSticky', ulStickyDirective);

}());
