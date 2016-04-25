( function () {

if (window.location.pathname !== '/') {
  window.location.href = '/#' + window.location.pathname;
}

angular
  .module('lawyerApp')
  .controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$scope'];
function homeCtrl ($scope) {
  var vm = this;
  vm.pageHeader = {
    title: 'Lawyer',
    strapline: 'Tu Asistente en cada Proceso!'
  };

  vm.sidebar = {
    content: "Tu Asistente en cada Proceso"
  };

  vm.showError = function (error) {
    $scope.$apply(function() {
      vm.message = error.message;
    });
  };
}

}) ();
