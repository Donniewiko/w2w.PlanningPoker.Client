(function() {
   'use strict';
   angular.module('app').controller('loginController', ['$scope', 'signalRService', login]);

   function login($scope, signalRService) {
      // when the connection is made to the PlanningPoker.Server the connectionID will be stored on the LocalStorage property SignalRConnectionID
      // Since the connectionID is published in the SignalRService, a broadcast is send when the client is successfull registered. 
      // Bind a listner on the registered broadcast.
      $scope.connectionID = localStorage.SignalRConnectionID;
      $scope.$on('registered', function(e, connectionID) {
         $scope.connectionID = connectionID;
      });

      $scope.submitLogin = function() {
         var userName = $scope.username;
         var connectionID = $scope.connectionID;
         signalRService.registerUser(userName, connectionID);
      };
   }
})();
