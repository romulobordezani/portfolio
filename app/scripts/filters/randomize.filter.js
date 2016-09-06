'use strict';
angular.module('rbApp').filter('randomize', function() {
    return function(input) {
        if ( input!==null && input!==undefined && input > 1) {
            return Math.floor((Math.random()*input)+1);
        }
    };
});
