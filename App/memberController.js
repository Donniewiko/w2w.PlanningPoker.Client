(function() {
   'use strict';
   angular.module('app').controller('memberController', ['$scope', '$state', '$window', '$timeout', 'signalRService', 'settingsService', member]);

   function member($scope, $state, $window, $timeout, signalRService, settingsService) {
      $scope.cards = [];
      $scope.cardReceived = false;
      //signalRService.getCards();

      signalRService.getCurrentUser().done(function (data) {
         $scope.$apply(function() {
            $scope.currentUser = data;
         });
      });
      
      $scope.sessionInProgress = false;
      $scope.$on('sessionInProgress', function(e, inProgress) {
         $scope.$apply(function() {
            $scope.cardReceived = false;
            $scope.sessionInProgress = inProgress;
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
         if ($scope.selectedCard != card) {
            $scope.selectedCard = card;
         }

         else if (!$scope.cardReceived && $scope.sessionInProgress) {
            console.log($scope.selectedCard);
            signalRService.submitCard($scope.selectedCard);
         }
      };

      $scope.isSelectedCard = function(card) {
         return card == $scope.selectedCard;
      }

      //var onBeforeUnloadHandler = function (event) {
      //   console.log("leaving...");
      //   $timeout(console.log("wachten"), 400);
      //   signalRService.disconnect();
      //}

      //if ($window.addEventListener) {
      //   $window.addEventListener('beforeunload', onBeforeUnloadHandler);
      //} else {
      //   $window.onbeforeunload = onBeforeUnloadHandler;
      //}

      var settings = settingsService.getSettings();


      $scope.setInitialStyle = function(idx){ return { left: (idx * 80) + (idx * 2) + "px"}};

      $scope.cards = ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '<i class="fa fa-question-circle fa-2x"></i>', '<i class="fa fa-coffee fa-2x"></i>'];
   };
})();