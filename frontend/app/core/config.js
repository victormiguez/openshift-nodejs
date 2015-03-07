(function () {
  'use strict';

  var core = angular.module('app.core');

  core.config(configure);

  /* @ngInject */
  function configure($routeProvider, $locationProvider, routehelperConfigProvider) {

    // Configure the common route provider
    routehelperConfigProvider.config.$routeProvider = $routeProvider;
    routehelperConfigProvider.config.docTitle = 'OP - ';

    $locationProvider.html5Mode(true);
  }
}());