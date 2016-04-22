angular.module('lawyerApp', ['ngRoute']);

function config ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html'
      controller: 'homeCtrl'
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
}

angular
  .module('lawyerApp')
  .config(['$routeProvider', config]);
  .directive('footerGeneric','footerGeneric');
