'use strict';
angular.module('slideOnSwipe', []).directive('slideOnSwipe', [ '$swipe',
        function($swipe) {

            return {

                restrict: 'A',

                scope: {
                    onlyLeft : '=',
                    onlyRight : '='
                },

                link: function(scope, ele /* , attrs, ctrl */ ) {

                    var startX, pointX;

                    $swipe.bind(ele, {

                        'start': function(coords) {
                            startX = coords.x;
                            pointX = coords.y;
                        },

                        'move': function(coords) {
                            var delta = coords.x - pointX;
                            angular.element(ele).parent().css('transform','translate3d(' + delta + 'px,0,0)');
                        },

                        'end': function(coords) {


                            var halfScreen = screen.width / 2;

                            if( scope.onlyLeft && coords.x <= halfScreen ){
                                angular.element(ele).parent().css('transform','translate3d(0px,0,0)');
                            }

                            if( scope.onlyRight && coords.x >= halfScreen ){
                                angular.element(ele).parent().css('transform','translate3d(0px,0,0)');
                            }

                        },

                        'cancel': function(coords) {

                            console.log( 'canceled' );

                            var halfScreen = screen.width / 2;

                            if( scope.onlyLeft && coords.x <= halfScreen ){
                                angular.element(ele).parent().css('transform','translate3d(0px,0,0)');
                            }

                            if( scope.onlyRight && coords.x >= halfScreen ){
                                angular.element(ele).parent().css('transform','translate3d(0px,0,0)');
                            }

                        }

                    });
                }

            };

        }]
);
