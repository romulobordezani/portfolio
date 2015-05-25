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
        'mdParallax'
    ])
    .config(
        function ( $routeProvider, $mdThemingProvider ) {
            $routeProvider

                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'homeController'
                })

                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'aboutController'
                })

                .when('/work', {
                    templateUrl: 'views/work.html',
                    controller: 'workController'
                })

                .when('/work/:year', {
                    templateUrl: 'views/work.html',
                    controller: 'workController'
                })

                .when('/work/:year/:current', {
                    templateUrl: 'views/work.html',
                    controller: 'workController'
                })

                .when('/contact', {
                    templateUrl: 'views/contact.html',
                    controller: 'contactController'
                })

                .when('/games', {
                    templateUrl: 'views/games.html',
                    controller: 'gamesController'
                })

                .otherwise({
                    redirectTo: '/'
                });

            $mdThemingProvider.theme('default')
                .primaryPalette('grey')
                .accentPalette('deep-orange');

            //$locationProvider.html5Mode(true);

        }

).run(
    function(){

        setTimeout( function(){

            var spinnerParent = document.getElementById('rb-body');
            var spinner = document.getElementById('pre-loader-wrapper');
            spinnerParent.removeChild(spinner);

        }, 1500);


        var signature = [

            '                                             ',
            '      __             __                      ',
            '     /__)  _    /   / _)  _ _/_ _   _    o   ',
            '    / ( ()//)(/(() /__)()/ (/(- /_ (//\\//    ',
            '                                             ',
            '                                             ',
            '                                    2015     ',
            '                                             ',

        ].join('\r\n');


        console.log('%c'+signature, 'font-size: 13px; color: #333333; background: #F6F6F6; ');

    }
);


