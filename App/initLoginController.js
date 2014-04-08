angular.module('app').controller('initLoginController', ['$scope', '$rootScope', '$state', initLoginController]);

function initLoginController($scope,$rootScope, $state) {
   $scope.setSignalRSource = function() {
      var s = document.createElement('script'); // use global document since Angular's $document is weak
      s.src = 'http://' + $scope.signalRSource + '/signalr/hubs';
      document.body.appendChild(s);
      // Wait 0.5 seconds for the script tags to be added
      setTimeout(function() {
         $.connection.hub.url = 'http://' + $scope.signalRSource + '/signalr';
         var serverHub = $.connection.serverHub;

         // Init the client methods for the PlanningPoker.Server to call.
         serverHub.client.registerUser = function (connectionID) {
            localStorage.SignalRConnectionID = connectionID;
            $state.go('login');
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
            
         });
      }, 500);

   };
};   
