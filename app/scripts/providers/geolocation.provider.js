'use strict';
angular.module('rbApp')
    .provider('Geolocation', function GeolocationProvider() {

        this.getLocation = function (callback) {

            try{
                if ( navigator.geolocation ) {
                    navigator.geolocation.getCurrentPosition(callback);
                    return true;
                }else {
                    return false;
                }
            }catch(e){
                return false;
            }

        };

        this.$get = function GeolocationProvider() {
            return this;
        };

    }
);
