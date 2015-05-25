'use strict';
angular.module('rbApp')
    .provider('Utils', function UtilProvider() {

        this.getBootstrapGridSize = function( ){

            var sufix,
                width = screen.width;

            if( width < 320 ){
                sufix = 'xs';
            }else if( width >= 320 && width < 600  ){
                sufix = 'sm';
            }else if( width >= 600 && width < 960  ){
                sufix = 'md';
            }else if( width >= 960  ){
                sufix = 'lg';
            }

            return sufix;

        };


        this.$get = function UtilProvider() {
            return this;
        };

    }
);
