(function() {
  'use strict';
  
  angular
    .module('app.demandas')
    .controller('Demandas', Demandas);

  /* @ngInject */
  function Demandas($scope, dataDemandas) {
    dataDemandas.todas()
      .success(function(result) {
        $scope.demandas = result;
      }).error(function(error) {
        console.log('error: ' + error);
      });
  }

}());