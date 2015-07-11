'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('homeController', function ($scope, Utils) {
        $scope.goTo = Utils.goTo;
    });
