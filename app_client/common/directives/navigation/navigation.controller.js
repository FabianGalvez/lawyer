(function () {

  angular
    .module('lawyerApp')
    .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['$location', 'authentication'];
    //function navigationCtrl($location, authentication) {
    function navigationCtrl($location, authentication) {
      var vm = this;

      //vm.currentPath = 'hola';

      vm.currentPath = $location.path();

      //vm.isLoggedIn = authentication.isLoggedIn();

      //vm.currentUser = authentication.currentUser();

      //vm.logout = function() {
      //  authentication.logout();
      //  $location.path('/');
      //};

    }
})();
