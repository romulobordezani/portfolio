'use strict';
angular.module('slideOnSwipe', []).directive('slideOnSwipe', [ '$swipe',
        function($swipe) {

            return {

                restrict: 'A',

                scope: {
                    start : '=',
                    end : '='
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
                            console.log( delta );
                            ele.css('transform','translate3d(' + delta + 'px,0,0)');
                        },

                        'end': function() {
                           // ele.css('transform','translate3d(0px,0,0)');
                        },

                        'cancel': function() {

                        }

                    });
                }

            };

        }]
);
