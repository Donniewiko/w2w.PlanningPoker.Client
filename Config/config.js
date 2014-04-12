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
       'ui.bootstrap',      // ui-bootstrap (ex: carousel, pagination, dialog)
       'angular-gestures'    // For touch actions
   ]);
})();