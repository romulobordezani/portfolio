'use strict';

angular.module('rbApp')
    .controller('workController', function ($scope, $mdDialog, workProvider, $rootScope, $routeParams, $timeout ){

        function init(){

            $scope.current = $routeParams.current || false;
            $scope.year = $routeParams.year || 2015;
            workProvider.setDialogAlreadySeem(true);
            workProvider.setWorkSwitcherVisibility(true);
            $rootScope.onWorkPage = true;
            $rootScope.swiping = false;

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

        $scope.setCurrent = function(clickedCard){
            if( !$rootScope.swiping ){
                workProvider.setCurrent(clickedCard, true);
            }
        };

        $scope.swipeLeft = function(){
            $rootScope.swiping = true;
            var newYear = parseInt($scope.year, 10) + 1;
            workProvider.setWorkYear(newYear, false, true);
        };

        $scope.swipeRight = function(){
            $rootScope.swiping = true;
            var newYear = parseInt($scope.year, 10) - 1;
            workProvider.setWorkYear(newYear, false, true);
        };

        init();

    }
);
