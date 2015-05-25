'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('homeController', function ($scope, homeService) {

        homeService
            .loadHome()
            .then( function( home ) {
                $scope.homeList = [].concat(home);
            });

        $scope.changeSelected = function(index){
            $scope.selectedIndex = index;
        };


    });
