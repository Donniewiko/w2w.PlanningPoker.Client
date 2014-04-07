(function () {
   'use strict';

   var app = angular.module('app', [
       // Angular modules 
       'ngAnimate',        // animations
       'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)
       'ngAnimate',
       'ngTouch',

       // 3rd Party Modules
       'ui.router',          // routing
       'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
   ]);
   app.controller('baseController', ['$scope', '$rootScope', '$state', function($scope,$rootScope, $state) {
      $scope.setSignalRSource = function() {
         var s = document.createElement('script'); // use global document since Angular's $document is weak
         s.src = 'http://' + $scope.signalRSource + '/signalr/hubs';
         document.body.appendChild(s);
         // Wait 0.5 seconds for the script tags to be added
         setTimeout(function() {
            $.connection.hub.url = 'http://' + $scope.signalRSource + '/signalr';
            var serverHub = $.connection.serverHub;
            serverHub.client.registerUser = function (connectionID) {
               localStorage.SignalRconnectionID = connectionID;
               $state.go('login');
            };

            serverHub.client.proceedLogin = function (dashboard) {
               if (dashboard) {
                  $state.go('dashboard');
               } else {
                  $state.go('member');

               }
            };

            $.connection.hub.start({ jsonp: true }).done(function() {
               
            });
         }, 500);

      };
   }]);
})();