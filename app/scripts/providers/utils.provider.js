'use strict';
angular.module('rbApp')
    .provider('Utils', function UtilProvider() {

        this.$get = ['$location', function ($location) {

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


            this.goTo = function(url){
                var isntAnAngularUrl = url.indexOf('http' ) >= 0 ? true : false;
                if( isntAnAngularUrl ){
                    document.location.href = url;
                }else{
                    url = url.replace('#', '');
                    $location.path(url);
                }
            };


            return this;

        }];

    }
);
