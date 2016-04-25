( function () {

angular.module('lawyerApp', ['ngRoute', 'ngSanitize']);]);

function config ($routeProvider, $locationProvider)) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html'
      controller: 'homeCtrl'
      controllerAs: 'vm'
    })
    .when('/about', {
      templateUrl: '/common/views/genericText.view.html',
      controller: 'aboutCtrl',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: '/auth/register/register.view.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: '/auth/login/login.view.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}

var procesoListCtrl = function ($scope, lawyerData) {
   $scope.message = "Buscando Procesos..";
   loc8rData
   .success(function(data) {
     $scope.message = data.length > 0 ? "" : "No hay procesos registrados";
     $scope.data = { procesos: data };
   })
   .error(function (e) {
     $scope.message = "Lo sentimos, se ha presentado un error";
     console.log(e);
   });
};

lawyerData.$inject = ['$http'];
var lawyerData = function ($http) {
  return $http.get('/api/procesos');
};

angular
  .module('lawyerApp')
  .config(['$routeProvider', '$locationProvider', config]);
  .controller('procesoListCtrl', procesoListCtrl);
  .service('lawyerData', lawyerData);
  .directive('footerGeneric', '$locationProvider','footerGeneric');

}) ();
