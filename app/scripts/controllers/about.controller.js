'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:aboutController
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('aboutController', function ($rootScope, Animator, $timeout){

        $rootScope.$on('$mdTabsChanged', function(){

            $timeout( function(){
                Animator.scrollToTabTop();
            },500);

        });

    });
