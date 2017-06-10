'use strict';
angular.module('rbApp')
    .provider('workProvider', function WorkProvider() {
        this.$get = ['$rootScope', '$location', '$timeout', 'Utils', 'CONFIG', function( $rootScope, $location, $timeout, CONFIG ){

            var workSwitcherVisibility = false;
            var dialogAlreadySeem = false;
            var year, current;

            this.rebuildUrl = function(){

                $timeout( function(){
                    var currentValue = current ? '/' + current : '';
                    $location.path( '/work/' + year +  currentValue );
                }, 150);

            };

            this.setDialogAlreadySeem = function(value) {
                dialogAlreadySeem = value;
            };

            this.getDialogAlreadySeem = function() {
                return dialogAlreadySeem;
            };

            this.getCurrent = function() {
                return current;
            };

            this.setCurrent = function( newCurrent, mustToRebuildUrl, mustToBroadcast ) {

                current = newCurrent;

                if( mustToBroadcast ) {
                    $rootScope.$broadcast('changeCurrentVal');
                }

                if( mustToRebuildUrl ){
                    this.rebuildUrl();
                }

            };

            this.resetCurrent = function() {
                current = false;
                $rootScope.$broadcast( 'changeCurrentVal' );
            };

            this.getWorkYear = function() {
                return year;
            };

            this.setWorkYear = function( newYear, mustToRebuildUrl, mustToBroadcast ) {

                newYear = parseInt( newYear, 10 );

                if( newYear < CONFIG.FIRST_YEAR  ){
                    newYear = CONFIG.FIRST_YEAR;
                }

                if( newYear > CONFIG.LAST_YEAR  ){
                    newYear = CONFIG.LAST_YEAR;
                }

                year = newYear;

                if( mustToBroadcast ){
                    $rootScope.$broadcast( 'changeWorkYear' );
                }

                if( mustToRebuildUrl ){
                    this.rebuildUrl();
                }

                return year;

            };


            this.getWorkSwitcherVisibility = function() {
                return workSwitcherVisibility;
            };

            this.setWorkSwitcherVisibility = function(newWorkSwitcherVisibility) {
                workSwitcherVisibility = newWorkSwitcherVisibility;
                $rootScope.$broadcast( 'changeWorkSwitcherVisibility' );
                return workSwitcherVisibility;
            };

            return this;

        }];

    }
);
