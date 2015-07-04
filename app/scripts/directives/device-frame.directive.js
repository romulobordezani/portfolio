'use strict';
angular.module('deviceFrame', []).directive('deviceFrame',function() {
        return {

            restrict: 'E',
            transclude: true,
            templateUrl : 'views/templates/deviceFrame.html',

            scope: {
                href: '@',
                size : '@',
                src : '@'
            },

            link: function(scope, element, attrs) {

                scope.href = attrs.href;
                scope.size = attrs.size;
                scope.src  = attrs.src;

            }

        };

     }
);
