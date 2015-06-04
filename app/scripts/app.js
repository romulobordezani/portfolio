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
                    controller: 'homeController',
                    animation: 'fade'
                })

                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'aboutController',
                    animation: 'fade'
                })

                .when('/work/:year/:current', {
                    templateUrl: function(urlattr){
                        return 'views/work/' + urlattr.year + '-' + urlattr.current + '.html';
                    },
                    controller: 'workController',
                    animation: 'work'
                })

                .when('/work/:year', {
                    templateUrl: function(urlattr){
                        return 'views/work/' + urlattr.year + '.html';
                    },
                    controller: 'workController',
                    animation: 'work'
                })

                .when('/work/', {
                    templateUrl: 'views/work/2015.html',
                    controller: 'workController',
                    animation: 'work'
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
                    redirectTo: '/'
                });

            $mdThemingProvider.theme('default')
                .primaryPalette('grey')
                .accentPalette('deep-orange');

            //$locationProvider.html5Mode(true);

        }

).run(
    function ($rootScope, $timeout) {

        $timeout( function(){
            var spinnerParent = document.getElementById('rb-body');
            var spinner = document.getElementById('pre-loader-wrapper');
            spinnerParent.removeChild(spinner);
        }, 3000);

        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                document.getElementById('ngview-container').scrollTop = 0;
            }, 500);
        });

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


