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
        'angularytics',
        'plangular'
    ])

    .config(
        function ( $routeProvider, $mdThemingProvider, AngularyticsProvider, plangularConfigProvider ) {
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
                    animation: 'fade'
                })

                .when('/work/', {
                    redirectTo: '/work/2016',
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
                    animation: 'fade'
                });

            $mdThemingProvider.theme('default')
                .primaryPalette('grey')
                .accentPalette('deep-orange');

            AngularyticsProvider.setEventHandlers(['GoogleUniversal']);


            plangularConfigProvider.clientId = 'a5f0b5300855bcc76cb9957762d89deb';


            //$locationProvider.html5Mode(true);

        }

).run(
    function ( $rootScope, $timeout, $templateCache, $http, Angularytics, Animator ) {

        Angularytics.init();

        $timeout( function(){
            var spinnerParent = document.getElementById('rb-body');
            var spinner = document.getElementById('main-pre-loader-wrapper');
            spinnerParent.removeChild(spinner);
        }, 1000);


        $rootScope.$on('$routeChangeSuccess', function () {
            Animator.scrollTo(document.getElementById('ngview-container'), 0, 500);
        });


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


