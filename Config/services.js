(function () {
   'use strict';

   var app = angular.module('app');
   
   app.factory('settingsService', function(){
      var service = {};
      
      service.getAddresses = function(){
         var settings = service.getSettings();
         return settings.addresses;
      };

      service.insertUsername = function(username){
         var settings = service.getSettings();

         settings.username = username;

         service.updateSettings(settings);
         return true;
      };
      service.insertAddress = function(address){
         var settings = service.getSettings();

         if (settings.addresses.indexOf(address) < 0) {
               settings.addresses.push(address);      
               service.updateSettings(settings);

            };
         return true;
      };

      service.getSettings = function(){
         var storedSettings = localStorage['settings'];
         
         // if no settings exist in storage, add it
         if (storedSettings === undefined) {
               var defaultSettings = 
               {
                  "addresses": [],
                  "preferences": [],
                  "username" : '',
                  "pokerCards" : []
               };
            
            service.updateSettings(defaultSettings);
            storedSettings = defaultSettings;
         };

         return JSON.parse(storedSettings);
      };

      service.updateSettings = function(settings){
         localStorage["settings"] = JSON.stringify(settings);
         return true;
      };

      return service;
   });

   app.factory('signalRService', ['$rootScope', '$state', function ($rootScope, $state) {
      var service = {};

      var serverHub = $.connection.serverHub;

      // Register the proxy for serverside methods
      service.getCards = function () {
         return serverHub.server.getCards();
      }

      service.disconnect = function() {
         return serverHub.server.disconnectUser();
      }

      service.registerUser = function (username, connectionID) {
         // todo: Remove the dashboard part.
         return serverHub.server.registerTeamMember(username, connectionID);
      }

      service.submitCard = function(card) {
         return serverHub.server.submitCard(card);
      }

      return service;
   }]);

})();