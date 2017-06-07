'use strict';
angular.module('slideOnSwipe', []).directive( 'slideOnSwipe', [ 'swipe', '$rootScope',
        function( swipe, $rootScope ) {

            return {

                restrict: 'A',

                scope: {
                    onlyLeft : '=',
                    onlyRight : '='
                },

                link: function(scope,ele /*   , attrs, ctrl */ ) {

                    var startX, pointX;

                    function comeBackToInitialPosition(){
                        angular.element(ele).parent().css('transform','translate3d(0px,0,0)');
                    }

                    swipe.bind(ele, {

                        'start': function( coords ){
                            startX = coords.x;
                            pointX = coords.x;
                            $rootScope.swiping = true;
                        },

                        'move': function( coords ){

                            var delta = coords.x - pointX;

                            /*if( scope.onlyLeft && coords.x >= startX ){
                                comeBackToInitialPosition();
                                return null;
                            }

                            if( scope.onlyRight && coords.x <= startX ){
                                comeBackToInitialPosition();
                                return null;
                            }*/

                            angular.element(ele).parent().css('transform','translate3d(' + delta + 'px,0,0)');

                        },

                        'end': function(coords) {

                            if( scope.onlyLeft && coords.x >= startX ){
                                comeBackToInitialPosition();
                            }

                            if( scope.onlyRight && coords.x <= startX ){
                                comeBackToInitialPosition();
                            }



                            console.log( coords.x , startX );


                            if( scope.onlyLeft &&  coords.x <= startX ){
                                scope.$parent.swipeRight();
                            }

                            if( scope.onlyRight && coords.x >= startX ){
                                scope.$parent.swipeLeft();
                            }

                            $rootScope.swiping = false;


                        },

                        'cancel': function() {
                            angular.element(ele).parent().css('transform','translate3d(0px,0,0)');
                            $rootScope.swiping = false;
                        }

                    });
                }

            };

        }]
);
