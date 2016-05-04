(function () {

  angular
    .module('lawyerApp')
    .directive('navigation', navigation);

    function navigation () {
      return {
        restrict: 'E',
        templateUrl: '/common/directives/navigation/navigation.template.html',
        controller: 'navigationCtrl as navvm'        
      };
    }

})();
