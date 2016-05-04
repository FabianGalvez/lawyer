( function () {

  angular
    .module('lawyerApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope'];
  function homeCtrl ($scope) {

    if (window.location.pathname !== '/') {
      window.location.href = '/#' + window.location.pathname;
    }

    var vm = this;
    console.log(window.location);
    vm.pageHeader = {
      title: 'Lawyer',
      strapline: 'Tu Asistente en cada Proceso Judicial!'
    };
    vm.sidebar = {
      content: ""
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };
}

}) ();
