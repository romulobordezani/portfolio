'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:aboutController
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('aboutController', function ($rootScope){

        $rootScope.$on('$mdTabsChanged', function(e){
           console.log(e);
        });

    });
