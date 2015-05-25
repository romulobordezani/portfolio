'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:appController
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('appController', ['$scope', '$mdSidenav','leftMenuService', '$location', '$rootScope', 'workProvider', 'Utils',
        function( $scope, $mdSidenav, leftMenuService, $location, $rootScope, workProvider, Utils  ){

            function init(){
                menu.loadService();
                workSwitcher.init();
            }

            var menu = {

                init : function(){
                    this.setListeners();
                    this.selectMenuItemByUrl();
                },

                setListeners : function(){

                    $rootScope.$on('$routeChangeStart', function (){
                        menu.selectMenuItemByUrl();
                    });

                    $scope.toggleSidenav = function(menuId) {
                        $mdSidenav(menuId).toggle();
                    };

                    $scope.menuClick = function( menuItem, e ) {

                        $scope.selected = angular.isNumber(menuItem) ? $scope.leftMenuList[menuItem] : menuItem;

                        $mdSidenav('leftMenu').toggle().then(function () {
                            //console.log('close LEFT is done');
                        });

                        if( menuItem.href.indexOf('http') > -1 ){

                            window.open(
                                menuItem.href,
                                '_blank'
                            );

                        }else{
                            $location.path(menuItem.href);
                        }

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
                            //Utils.laoderCurtain.show();
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
