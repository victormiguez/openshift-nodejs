(function() {
  'use strict';
  
  angular
    .module('app.demandas')
    .controller('Demandas', Demandas);

  /* @ngInject */
  function Demandas($scope, dataDemandas, $location, $anchorScroll) {

    $scope.filters = {
      demanda: '',
      anoCriacao: '',
      protocolo: '',
      tema: '',
      forum: '',
      regiao: []
    };
    
    dataDemandas.todas()
      .success(function(result) {
        $scope.demandas = result;
      }).error(function(error) {
        console.log('error: ' + error);
      });

    $scope.atualizarDemandas = function(regiao) {
      $scope.limparFiltro();

      switch(regiao) {
        case 'norte':
          $scope.filters.regiao.push('AR4', 'AR11', 'Barão Geraldo', 'Nova Aparecida');
          break;
        
        case 'noroeste':
          $scope.filters.regiao.push('AR5', 'AR13');
          break;
        
        case 'sudoeste':
          $scope.filters.regiao.push('AR7', 'AR12');
          break;
        
        case 'sul':
          $scope.filters.regiao.push('AR6', 'AR8', 'AR9', 'AR10');
          break;
        
        case 'leste':
          $scope.filters.regiao.push('AR14', 'Sousas', 'Joaquim Egídio');
          break;
        
        case 'centro':
          $scope.filters.regiao.push('AR1', 'AR2', 'AR3');
          break;
      }

      $('body').animate({scrollTop: $('#demandas').offset().top}, 'slow');
    };

    $scope.limparFiltro = function() {
      $scope.filters = {
        demanda: '',
        anoCriacao: '',
        protocolo: '',
        tema: '',
        forum: '',
        regiao: []
      };
    }
  }


}());