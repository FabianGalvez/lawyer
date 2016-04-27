( function () {

angular.module('lawyerApp', ['ngRoute', 'ngSanitize']);

function config ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .when('/about', {
      templateUrl: 'common/views/genericText.view.html',
      controller: 'aboutCtrl',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: 'common/auth/register/register.view.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: 'common/auth/login/login.view.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});

  //$locationProvider.html5Mode(true);
}

angular
  .module('lawyerApp')
  .config(['$routeProvider', config])
  .controller('procesoListCtrl', procesoListCtrl);
}) ();
