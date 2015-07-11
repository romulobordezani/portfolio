'use strict';
angular.module('responsibilities', []).directive('responsibilities',
        function() {
            return {

                restrict: 'E',
                transclude: true,
                templateUrl : 'views/templates/responsibilities.directive.html',

                scope: {
                    frontend: '=?',
                    backend : '=?',
                    database : '=?',
                    ux : '=?',
                    design : '=?',
                    tests : '=?',
                    headline : '=?',
                    custom : '=?',
                    customImg : '=?',
                    customLabel : '=?'
                }

                // ,link: function(scope, element, attrs) {}

            };

     }
);
