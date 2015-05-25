'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:contactController
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('contactController', function ($scope, $http, transformRequestAsFormPost, $mdDialog ){

        $scope.user = {
            name: '',
            email: '',
            phone: '',
            address: '',
            message: ''
        };


        $scope.sendEmail = function(){

            if( ! $scope.contactForm.$valid ){
                return false;
            }

            var request = $http({
                method: 'post',
                url: 'enviangular.php',
                transformRequest: transformRequestAsFormPost,
                data:  $scope.user
            });

            request.success(
                function() {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Message Sent.')
                            .content('I will reply it as soon as possible.  Thank you. Cheers')
                            .ariaLabel('I will reply it as soon as possible. Thank you. Cheers')
                            .ok('Ok')
                    );
                    $scope.user = {
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        message: ''
                    };
                }
            );

        };

    });
