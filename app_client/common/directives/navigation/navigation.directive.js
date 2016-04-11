(function () {
  angular
    .module('lawyerApp')
    .directive('navigation', navigation);

    function navigation () {
      return {
        restrict: 'EA',
        templateUrl: '/common/directives/navigation/navigation.template.html'
        controller: 'navigationCtrl as navvm'
      };
    }
})();
