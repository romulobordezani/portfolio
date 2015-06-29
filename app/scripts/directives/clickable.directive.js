'use strict';
angular.module('addClassOnClick', []).directive('clickable', [ 'Utils', '$timeout',
     function (Utils, $timeout) {
        return {

            restrict: 'A',

            scope: {
                clickableUrl: '@'
            },

            link: function(scope, element) {

                element.addClass('clickable noselect');

                element.bind('click', function() {

                    element.addClass('clicked');

                    $timeout(function(){
                        Utils.goTo(scope.clickableUrl);
                        element.removeClass('clicked');
                    }, 666 );

                });

            }
        };

     }
]);
