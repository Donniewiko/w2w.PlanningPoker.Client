(function () {
   'use strict';

   angular.module('app').factory('signalRService', ['$rootScope', '$state', function ($rootScope, $state) {
      var service = {};

      var serverHub = $.connection.serverHub;

      // Register the proxy for serverside methods
      service.getCards = function () {
         return serverHub.server.getCards();
      }

      service.registerUser = function (username, connectionID) {
         // todo: Remove the dashboard part.
         return serverHub.server.registerTeamMember(username, false, connectionID);
      }

      service.submitCard = function(card) {
         return serverHub.server.submitCard(card.StoryPoints);
      }

      return service;
   }]);

})();