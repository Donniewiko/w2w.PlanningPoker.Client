(function() {
   'use strict';
   angular.module('app').controller('loginController', ['$scope','$rootScope', '$timeout', '$injector', '$state', login]);

   function login($scope, $rootScope, $timeout, $injector, $state) {
      var signalRService;
      $scope.connectionID = '';
      //Init
       var SignalRSource = {
         init: function(){
            var s = document.createElement('script'); // use global document since Angular's $document is weak
            s.src = 'http://' + $scope.signalRSource + '/signalr/hubs';
            document.body.appendChild(s);
            // Wait 0.5 seconds for the script tags to be added
         },

         connect: function(){
            $timeout(function() {
               $.connection.hub.url = 'http://' + $scope.signalRSource + '/signalr';
               var serverHub = $.connection.serverHub;
               
               if (serverHub !== undefined) {
	               // Init the client methods for the PlanningPoker.Server to call.
	               serverHub.client.registerUser = function (connectionID) {
	                  $scope.connectionID = connectionID;
	               };

	               serverHub.client.proceedLogin = function (dashboard) {
	                     $state.go('member');
	               };
	               
	               serverHub.client.submitCards = function (pokerCards) {
	                  $rootScope.$broadcast('pokerCards', pokerCards);
	               };

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

	               $.connection.hub.start({ jsonp: true }).done(function() {
	                  signalRService = $injector.get('signalRService');
	                  
	               });
               };
         }, 500);

      }
   };

$scope.signalRHub = '';

   $scope.validIP = false;

      $scope.$watch('signalRSource', function(){
         $timeout.cancel;
         var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
         if(ipRegex.test($scope.signalRSource)){
            var loadSignalRTimeout = $timeout(function() {
               $scope.validIP = true;
               SignalRSource.init();
               $scope.signalRHub = $.connection.serverHub;
            }, 1000);            
         }
      }); 

      $scope.$watch('signalRHub', function(){
      	SignalRSource.connect();
      });

      $scope.submitLogin = function() {
         var userName = $scope.username;
         var connectionID = $scope.connectionID;
         signalRService.registerUser(userName, connectionID);
      };
   }
})();
