'use strict';

angular.module('rbApp')
    .controller('workController', function ($scope, $mdDialog, workProvider, $rootScope, $routeParams, $timeout ){

        function init(){

            $scope.current = $routeParams.current || false;
            $scope.year = $routeParams.year || 2015;
            workProvider.setDialogAlreadySeem(true);
            workProvider.setWorkSwitcherVisibility(true);

            $timeout( function(){
                workProvider.setWorkYear( $scope.year, false, true );
                workProvider.setCurrent( $scope.current, false, true );

            }, 200);

            if( $scope.year === 2015 || $scope.year === '2015' ){

                $timeout( function(){
                    $rootScope.$broadcast('forceAnimationSet', { animation : 'right' } );
                }, 1500);

            }



        }

        $scope.reloadIt = function(){

            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Are you serious?')
                    .content('There is no reason to reload an Angular site dude...')
                    .ariaLabel('There is no reason to reload an Angular site dude...')
                    .ok('Stop kidding me')
            );


        };

        $scope.setCurrent = function(clickedCard){
            workProvider.setCurrent(clickedCard, true);
        };

        $scope.swipeLeft = function(){
            var newYear = parseInt($scope.year, 10) + 1;
            workProvider.setWorkYear(newYear, false, true);
        };

        $scope.swipeRight = function(){
            var newYear = parseInt($scope.year, 10) - 1;
            workProvider.setWorkYear(newYear, false, true);
        };

        init();

    }
);
