'use strict';
angular.module('addClassOnClick', []).directive('clickable', [ 'Utils', '$timeout',
     function (Utils, $timeout) {
        return {

            restrict: 'A',

            link: function(scope, element, attrs) {

                element.addClass('clickable noselect');

                element.bind('click', function() {

                    element.addClass('clicked');

                    $timeout(function(){
                        Utils.goTo(attrs.clickableUrl, attrs.clickableTarget);
                        element.removeClass('clicked');
                    }, 666 );

                });

            }
        };

     }
]);
