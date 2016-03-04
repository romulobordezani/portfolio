'use strict';

angular
    .module('rbApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMaterial',
        'ngMessages',
        'mdParallax',
        'addClassOnClick',
        'deviceFrame',
        'responsibilities',
        'slideOnSwipe',
        'angularytics'
    ])

    .config(
        function ( $routeProvider, $mdThemingProvider, AngularyticsProvider ) {
            $routeProvider

                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'homeController',
                    animation: 'fade',
                    routeclass : 'home'
                })

                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'aboutController',
                    animation: 'fade',
                    routeclass : 'home'
                })

                .when('/sophia', {
                    templateUrl: 'views/sophia.html',
                    animation: 'fade',
                    routeclass : 'home'
                })

                .when('/work/:year/:current', {

                    templateUrl: function(urlattr){

                        var current;

                        if( urlattr.current < 10){
                            current = '0' + urlattr.current;
                        }else{
                            current = urlattr.current;
                        }

                        return 'views/work/' + urlattr.year + '/' + current + '.html';

                    },

                    controller: 'workController',
                    animation: 'fade'
                })

                .when('/work/:year', {
                    templateUrl: function(urlattr){
                        return 'views/work/' + urlattr.year + '/index.html';
                    },
                    controller: 'workController',
                    animation: 'work'
                })

                .when('/work/', {
                    redirectTo: '/work/2015',
                    animation: 'fade'
                })

                .when('/contact', {
                    templateUrl: 'views/contact.html',
                    controller: 'contactController',
                    animation: 'fade'
                })

                .when('/games', {
                    templateUrl: 'views/games.html',
                    controller: 'gamesController',
                    animation: 'fade'
                })

                .otherwise({
                    redirectTo: '/',
                    animation: 'fadest'
                });

            $mdThemingProvider.theme('default')
                .primaryPalette('grey')
                .accentPalette('deep-orange');

            AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);

            //$locationProvider.html5Mode(true);

        }

).run(
    function ( $rootScope, $timeout, $templateCache, $http, Angularytics ) {

        Angularytics.init();

        $timeout( function(){
            var spinnerParent = document.getElementById('rb-body');
            var spinner = document.getElementById('main-pre-loader-wrapper');
            spinnerParent.removeChild(spinner);
        }, 3000);


        /*

        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                document.getElementById('ngview-container').scrollTop = 0;
            }, 500);
        });

        */

        $http.get('views/contact.html', { cache: $templateCache }).then(function(){

            $http.get('views/work/2015/index.html', { cache: $templateCache }).then(function() {

                $http.get('views/home.html', { cache: $templateCache });

            });

        });

        var signature = [

            '                                             ',
            '      __             __                      ',
            '     /__)  _    /   / _)  _ _/_ _   _    o   ',
            '    / ( ()//)(/(() /__)()/ (/(- /_ (//\\//    ',
            '                                             ',
            '                                             ',
            '                                    2016     ',
            '                                             ',

        ].join('\r\n');


        console.log('%c'+signature, 'font-size: 13px; color: #333333; background: #F6F6F6; ');

    }
);


