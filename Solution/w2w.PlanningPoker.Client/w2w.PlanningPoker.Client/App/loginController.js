(function() {
   'use strict';
   angular.module('app').controller('loginController', ['$scope', '$state', '$stateParams', 'signalRService', login]);

   function login($scope, $state, $stateParams, signalRService) {
      $scope.connectionID = localStorage.SignalRconnectionID;
      $scope.$on('registered', function(e, connectionID) {
         $scope.connectionID = connectionID;
      });

      $scope.submitLogin = function() {
         var userName = $scope.username;
         var redirectToDashboard = $scope.dashboard;
         var connectionID = $scope.connectionID;
         signalRService.registerUser(userName, redirectToDashboard, connectionID);
      };
   }
})();
