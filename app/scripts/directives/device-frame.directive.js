'use strict';
angular.module('deviceFrame', []).directive('deviceFrame',[ '$mdDialog',
        function($mdDialog) {
            return {

                restrict: 'E',
                transclude: true,
                templateUrl : 'views/templates/deviceFrame.directive.html',

                scope: {
                    href: '@',
                    size : '@',
                    src : '@'
                },

                link: function(scope, element, attrs) {

                    scope.href = attrs.href;
                    scope.size = attrs.size;
                    scope.src  = attrs.src;


                    scope.showImage = function(){

                        var fullSrc = attrs.src.replace(/(\-thumb)/g, '');

                        $mdDialog.show({

                            clickOutsideToClose: true,
                            scope: scope,
                            preserveScope: true,
                            template:   '<md-dialog>' +
                                        '  <md-dialog-content  >' +
                                        '     <a  target="_blank" href="' + fullSrc + '" >' +
                                        '       <img class="md-whiteframe-z2" style="width: 100%; height: auto;" src="' + fullSrc + '" />' +
                                        '     </a>' +
                                        '  </md-dialog-content>' +
                                        '  <div class="md-actions">' +

                                        '    <md-button class="md-icon-button" ng-click="launch()">' +
                                        '      <md-icon md-svg-src="images/uis/ic_launch_black_24px.svg" aria-label="Launch"></md-icon>'+
                                        '    </md-button>' +

                                        '    <md-button ng-click="closeDialog()" class="md-icon-button" >' +
                                        '      <md-icon md-svg-src="images/uis/ic_close_24px.svg" aria-label="Close"></md-icon>'+
                                        '    </md-button>' +

                                        '  </div>' +
                                        '</md-dialog>',

                            controller: function DialogController($scope, $mdDialog) {

                                $scope.closeDialog = function() {
                                    $mdDialog.hide();
                                };

                                $scope.launch = function() {
                                    window.open( fullSrc );
                                };
                            }


                        });

                    };

                }

            };

     }]
);
