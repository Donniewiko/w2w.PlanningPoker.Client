(function () {
   'use strict';

   angular.module('app').factory('signalRService', ['$rootScope', '$state', function ($rootScope, $state) {
      var service = {};

      var serverHub = $.connection.serverHub;

      service.initSignalR = function () {
         // client methods here
         serverHub.client.registerUser = function (connectionID) {
            $rootScope.$broadcast('registered', connectionID);
         };

         
         serverHub.client.submitCards = function (pokerCards) {
            $rootScope.$broadcast('pokerCards', pokerCards);
         };

         serverHub.client.teamMemberList = function (teamMembers) {
            $rootScope.$broadcast('teamMemberResult', teamMembers);
         }

         serverHub.client.sessionInProgress = function (inProgress) {
            $rootScope.$broadcast('sessionInProgress', inProgress);
         };


         serverHub.client.showResults = function(results) {
            console.log(results);
            $rootScope.$broadcast('results', results);
         };
         serverHub.client.cardReceived = function() {
            $rootScope.$broadcast('cardReceived');
         };

         $.connection.hub.start().done(function () {
         });



         return true;
      }();

      service.getCards = function () {
         return serverHub.server.getCards();
      }

      service.registerUser = function (username, dashboard, connectionID) {
         var sendToDashboard = dashboard || false;
         return serverHub.server.registerTeamMember(username, sendToDashboard, connectionID);
      }

      service.submitCard = function(card) {
         return serverHub.server.submitCard(card.StoryPoints);
      }
      service.startRound = function () {
         return serverHub.server.startRound();
      };

      service.initTeamMembers = function () {
         return serverHub.server.initTeamMemberList();
      }


      return service;
   }]);

})();