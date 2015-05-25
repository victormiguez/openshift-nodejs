(function() {
  'use strict';

  angular
    .module('app.demandas')
    .factory('dataDemandas', dataDemandas);

  function dataDemandas($http){
    var urlBase = '/api/';
    var demandas = {};

    demandas.todas = function() {
      return $http.get(urlBase + 'demandas')
    }

    return demandas;
  }
})();