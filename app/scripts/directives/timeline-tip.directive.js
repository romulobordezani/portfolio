'use strict';
angular.module('timelineTip', []).directive('timelineTip',
  function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl : 'views/templates/timeline-tip.directive.html',
      link: function(scope) {

        var shouldShow;

        if (window.shouldShow === undefined || window.shouldShow === true) {
          shouldShow = true;
        } else {
          shouldShow = false;
        }

        scope.shouldShow = shouldShow;

        scope.seen = function() {
          scope.animateExit = true;
          setTimeout(function() {
            window.shouldShow = false;
            scope.shouldShow = false;
          }, 1500);
        };

      }
    };

  }
);
