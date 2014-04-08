(function() {
   'use strict';

   angular.module('app').config(['$stateProvider', '$urlRouterProvider', routeConfigurator]);
   
   function routeConfigurator($stateProvider, $urlRouterProvider) {
      // set default route to the Init page
      $urlRouterProvider.otherwise('/');
   
      $stateProvider
      // State for init the app, it should make a connection to the PlanningPoker.Server instance
      .state('init', {
         url: "/",
         templateUrl: "App/initLogin.html",
         controller: "initLoginController"})
      // Once the connectionID from the PlanningPoker.Server instance is obtained, client will be redirected to the login page.
      .state('login', {
         templateUrl: "App/login.html",
         controller: "loginController"})
      // If the login is successfull, send the client to the application itself
      .state('member', {
         templateUrl: "App/member.html",
         controller: "memberController"
      });
   }
})();