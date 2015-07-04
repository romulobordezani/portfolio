'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('homeController', function ($scope, Utils, $routeParams, $rootScope, Animator) {

        $rootScope.$on('$mdTabsChanged', function(){
            Animator.scrollToTabTop();
        });

        $scope.goTo = Utils.goTo;

    });
