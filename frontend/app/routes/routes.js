(function () {
  'use strict';

  angular
    .module('app.routes')
    .config(function ($routeProvider) {
    // $locationProvider.html5Mode(true);

      $routeProvider
        .when('/', {
          templateUrl : ''
        })
    });
}());