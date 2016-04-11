(function () {
  angular
    .module('lawyerApp')
    .service('authentication', authentication);

  authentication.$inject = ['$window'];
  function authentication ($window) {
    var saveToken = function (token) {
      $window.localStorage['lawyer-token'] = token;
    };
    var getToken = function () {
      return $window.localStorage['lawyer-token'];
    };

    return {
      saveToken : saveToken,
      getToken : getToken
    };
  }
})();

register = function(user) {
  return $http.post('/api/register', user).success(function(data){
    saveToken(data.token);
  });
};


login = function(user) {
  return $http.post('/api/login', user).success(function(data) {
    saveToken(data.token);
  });
};

logout = function() {
  $window.localStorage.removeItem('lawyer-token');
};

var isLoggedIn = function() {
  var token = getToken();

  if(token){
    var payload = JSON.parse($window.atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

var currentUser = function() {
  if(isLoggedIn()){
    var token = getToken();
    var payload = JSON.parse($window.atob(token.split('.')[1]));
    return {
      email : payload.email,
      name : payload.name
    };
  }
};

function navigationCtrl($location, authentication) {
  var vm = this;

  vm.currentPath = $location.path();
  vm.isLoggedIn = authentication.isLoggedIn();
  vm.currentUser = authentication.currentUser();
  vm.logout = function() {
    authentication.logout();
    $location.path('/');
  };
}
