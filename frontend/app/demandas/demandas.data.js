(function() {
  'use strict';

  angular
    .module('app.demandas')
    .factory('dataDemandas', dataDemandas);

  function dataDemandas($http){
    var urlBase = 'http://localhost:3000/api/';
    var demandas = {};

    demandas.todas = function() {
      return $http.get(urlBase + 'demandas')
    }

    return demandas;
  }
})();