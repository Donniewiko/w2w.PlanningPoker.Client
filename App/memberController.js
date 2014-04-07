(function() {
   'use strict';
   angular.module('app').controller('memberController', ['$scope', '$state', 'signalRService', member]);

   function member($scope, $state, signalRService) {
      $scope.cards = [];
      $scope.cardReceived = false;

      signalRService.getCards();
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
            console.log('received');
         });
      });

      $scope.submitCard = function (card) {
         if (!$scope.cardReceived && $scope.inProgress) {
            signalRService.submitCard(card);
         }
      };

      $scope.$on('pokerCards', function(e, pokerCards) {
         $scope.$apply(function() {
            $scope.cards = pokerCards;
         });
      });
   }
})();