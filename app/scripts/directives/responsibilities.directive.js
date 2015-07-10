'use strict';
angular.module('responsibilities', []).directive('responsibilities',[ '$mdDialog',
        function($mdDialog) {
            return {

                restrict: 'E',
                transclude: true,
                templateUrl : 'views/templates/responsibilities.directive.html',

                scope: {
                    frontend: '=',
                    backend : '=',
                    database : '=',
                    ux : '=',
                    design : '='
                },

                link: function(scope, element, attrs) {
                    for( var attr in scope ){
                        console.log( scope[attr] );
                    }
                }

            };

     }]
);
