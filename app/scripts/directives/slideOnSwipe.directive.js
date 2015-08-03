'use strict';
angular.module('slideOnSwipe', []).directive('slideOnSwipe', [ '$swipe', '$rootScope',
        function($swipe,$rootScope) {

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
                            $rootScope.swiping = true;
                        },

                        'move': function(coords) {
                            var delta = coords.x - pointX;
                            angular.element(ele).parent().css('transform','translate3d(' + delta + 'px,0,0)');
                        },

                        'end': function(coords) {

                            if( scope.onlyLeft && coords.x <= startX ){
                                angular.element(ele).parent().css('transform','translate3d(0px,0,0)');
                            }

                            if( scope.onlyRight && coords.x >= startX ){
                                angular.element(ele).parent().css('transform','translate3d(0px,0,0)');
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
