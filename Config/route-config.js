(function() {
   'use strict';

   var app = angular.module('app');

   app.config(['$stateProvider', '$urlRouterProvider', routeConfigurator]);
   function routeConfigurator($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('login', {
         templateUrl: "App/login.html",
         controller: "loginController"
      }).state('member', {
         templateUrl: "App/member.html",
         controller: "memberController"
      });
   }
})();