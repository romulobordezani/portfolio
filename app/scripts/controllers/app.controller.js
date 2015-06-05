'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:appController
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('appController', ['$scope', '$mdSidenav','leftMenuService', '$location', '$rootScope', 'workProvider',
        function( $scope, $mdSidenav, leftMenuService, $location, $rootScope, workProvider ){

            function init(){
                menu.loadService();
                workSwitcher.init();
            }

            $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){

                menu.selectMenuItemByUrl();
                $rootScope.contactButtonVisibility = true;
                $rootScope.routeclass = currRoute.routeclass;

                if( currRoute.animation === 'work' && prevRoute ){

                    var currYear = currRoute.params.year || null;
                    var prevYear = prevRoute.params.year || null;

                    if( currYear < prevYear ){
                        $scope.animation = 'right';
                    }else if( currYear && prevYear ){
                        $scope.animation = 'left';
                    }else{
                        $scope.animation = 'fade';
                    }

                }else{
                    $scope.animation = currRoute.animation;
                }

                if( $scope.animation === undefined || $scope.animation === 'work' ){
                    $scope.animation = 'fade';
                }

            });



            $rootScope.$on('forceAnimationSet', function(event, args) {
                $scope.animation = args.animation;
            });




            var menu = {

                init : function(){
                    this.setListeners();
                    this.selectMenuItemByUrl();
                },

                setListeners : function(){

                    $scope.toggleSidenav = function(menuId) {
                        $mdSidenav(menuId).toggle();
                    };

                    $scope.menuClick = function( menuItem, e ) {

                        $scope.selected = angular.isNumber(menuItem) ? $scope.leftMenuList[menuItem] : menuItem;

                        $mdSidenav('leftMenu').toggle().then(function () {

                            if( menuItem.href.indexOf('http') > -1 ){

                                window.open(
                                    menuItem.href,
                                    '_blank'
                                );

                            }else{
                                $location.path(menuItem.href);
                            }

                        });

                        e.preventDefault();

                    };


                },

                loadService : function(){

                    leftMenuService
                        .loadMenu()
                        .then( function( leftMenu ) {
                            $scope.leftMenuList = [].concat(leftMenu);
                            menu.init();
                        });

                },

                selectMenuItemByUrl : function(){
                    for( var i=0; i < $scope.leftMenuList.length; i++ ){
                        if( $location.path().indexOf( $scope.leftMenuList[i].href) >= 0 ){
                            $scope.selected = $scope.leftMenuList[i];
                        }
                    }
                }

            };

            var workSwitcher = {

                init : function(){

                    var alreadyLoaded = 0;

                    $scope.workSwitcherVisibility =  workProvider.getWorkSwitcherVisibility();
                    $scope.yearSlider = 2015;


                    $scope.$watch('yearSlider', function(value){

                        if( workSwitcher.isWorkPage() && alreadyLoaded > 0 ){
                            workProvider.resetCurrent();
                            workProvider.setWorkYear( value, true, false);
                        }

                        alreadyLoaded++;

                    });

                    this.setListeners();

                },

                changeYear : function(){
                    $scope.yearSlider = workProvider.getWorkYear();
                },

                setListeners : function(){

                    $rootScope.$on( 'changeWorkSwitcherVisibility', function(){
                        $scope.workSwitcherVisibility =  workProvider.getWorkSwitcherVisibility();
                    });

                    $rootScope.$on( 'changeWorkYear', workSwitcher.changeYear );


                    $rootScope.$on('$routeChangeSuccess', function(){

                        if( ! workSwitcher.isWorkPage() ){
                            workProvider.setWorkSwitcherVisibility(false);
                        }

                    });

                },

                isWorkPage : function(){
                    return  $location.path().indexOf('/work') >= 0 ;
                }

            };

            init();

        }
    ]);
