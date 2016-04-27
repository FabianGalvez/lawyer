(function () {
  angular
    .module('lawyerApp')
    .controller('aboutCtrl', aboutCtrl);

    function aboutCtrl() {
      var vm = this;

      vm.pageHeader = {
        title: 'Acerca Lawyer',
      };

      vm.main = {
        content: 'Lawyer fue creado para ayudar a no perder ni una sola acción en cada proceso legal! '
      };
    }
})();
