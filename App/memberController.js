(function() {
   'use strict';
   angular.module('app').controller('memberController', ['$scope', '$state', 'signalRService', 'settingsService', member]);

   function member($scope, $state, signalRService, settingsService) {
      $scope.cards = [];
      $scope.cardReceived = false;
      //signalRService.getCards();


      $scope.inProgress = false;
      $scope.$on('sessionInProgress', function(e, inProgress) {
         $scope.$apply(function () {
            $scope.cardReceived = false;
            $scope.inProgress = inProgress;
         });
      });

      $scope.$on('results', function() {
         $scope.$apply(function() {
            
         });
      });

      $scope.$on('cardReceived', function() {
         $scope.$apply(function() {
            $scope.cardReceived = true;
         });
      });

      $scope.submitCard = function (card) {
         if (!$scope.cardReceived && $scope.inProgress) {
            console.log(card);
            signalRService.submitCard(card);
         }
      };

      var settings = settingsService.getSettings();

      $scope.username = settings.username;

      $scope.setInitialStyle = function(idx){ return { left: (idx * 50) + (idx * 2) + "px"}};

      $scope.cards = ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', 'koffie'];
   };
})();