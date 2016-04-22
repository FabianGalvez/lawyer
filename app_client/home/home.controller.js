angular
  .module('loc8rApp')
  .controller('homeCtrl', homeCtrl);

  function homeCtrl () {
    var vm = this;
    vm.pageHeader = {
      title: 'Lawyer',
      strapline: 'Tu Asistente en cada Proceso!'
    };

    vm.sidebar = {
      content: "Tu Asistente en cada Proceso"
    };
  }
