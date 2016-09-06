'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:appController
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('appController', ['$scope', '$mdSidenav','leftMenuService', '$location', '$rootScope', 'workProvider', 'favicoProvider', '$timeout',
        function( $scope, $mdSidenav, leftMenuService, $location, $rootScope, workProvider, favicoProvider, $timeout ){

            function init(){
                attachEvents();
                menu.loadService();
                workSwitcher.init();
            }

            function attachEvents(){

                $rootScope.$on('$routeChangeStart', function(event, currRoute /* , prevRoute */ ){

                    menu.selectMenuItemByUrl();
                    favicoProvider.blow();
                    menu.blowHome();
                    $rootScope.contactButtonVisibility = true;
                    $rootScope.onWorkPage = false;
                    $rootScope.routeclass = currRoute.routeclass;
                    $rootScope.$$listeners.$mdTabsChanged=[];
                    $scope.animation = currRoute.animation || 'fade';
                    $scope.showFooter = currRoute.showFooter || false;

                });

                $rootScope.$on('forceAnimationSet', function(event, args) {
                    $scope.animation = args.animation;
                });

            }



            var blowingTimeout;
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
                                    menuItem.href
                                );

                            }else{
                                $location.path(menuItem.href);
                            }

                        });

                        e.preventDefault();

                    };


                    $scope.swipeLeftMenu = function(){
                        $mdSidenav('leftMenu').close();
                    };

                    $scope.blowOnClick = function(){
                        $location.path('/');
                        menu.blowHome();
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
                },

                blowHome : function(){

                    $rootScope.blow = true;
                    //clearTimeout(blowingTimeout);

                    blowingTimeout = $timeout( function(){

                        $rootScope.blow = false;
                    }, 1500);



                }

            };

            var workSwitcher = {

                init : function(){

                    var alreadyLoaded = 0;

                    $scope.workSwitcherVisibility =  workProvider.getWorkSwitcherVisibility();
                    $scope.yearSlider = 2016;

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
