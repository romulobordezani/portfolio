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
                    customLabel : '=?',
                    custom1 : '=?',
                    customImg1 : '=?',
                    customLabel1 : '=?',
                    custom2 : '=?',
                    customImg2 : '=?',
                    customLabel2 : '=?'
                }

                // ,link: function(scope, element, attrs) {}

            };

     }
);
