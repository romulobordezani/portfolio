'use strict';

angular
    .module('rbApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngMaterial',
        'ngMessages',
        'mdParallax',
        'addClassOnClick',
        'deviceFrame',
        'responsibilities',
        'timelineTip',
        'angularytics',
        'plangular'
    ])

    .config(
        function ( $routeProvider, $mdThemingProvider, AngularyticsProvider, plangularConfigProvider, CONFIG ) {
            $routeProvider

                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'homeController',
                    animation: 'fade',
                    routeclass : 'home',
                    showFooter : true
                })

                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'aboutController',
                    routeclass : 'home',
                    animation: 'fade'
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
                    animation: 'fade',
                    routeclass : 'work'
                })

                .when('/work/:year', {
                    templateUrl: function(urlattr){
                        return 'views/work/' + urlattr.year + '/index.html';
                    },
                    controller: 'workController',
                    animation: 'fade',
                    routeclass : 'work'
                })

                .when('/work/', {
                    redirectTo: function(){
                        return '/work/' + CONFIG.LAST_YEAR;
                    },
                    animation: 'fade',
                    routeclass : 'work'
                })

                .when('/contact', {
                    templateUrl: 'views/contact.html',
                    controller: 'contactController',
                    routeclass : 'home',
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


        }

).run(
    function ( $rootScope, $timeout, $templateCache, $http, Angularytics, Animator, CONFIG ) {

        Angularytics.init();

        $timeout( function(){
            var spinnerParent = document.getElementById('rb-body');
            var spinner = document.getElementById('main-pre-loader-wrapper');
            spinnerParent.removeChild(spinner);
        }, 700);


        $rootScope.$on('$routeChangeSuccess', function () {
            Animator.scrollTo(document.getElementById('ngview-container'), 0, 500);
        });


        $http.get('views/contact.html', { cache: $templateCache }).then(function(){

            $http.get('views/work/' + CONFIG.LAST_YEAR + '/index.html', { cache: $templateCache }).then(function() {

                $http.get('views/about.html', { cache: $templateCache });

            });

        });

        var signature = [

            '                                             ',
            '      __             __                      ',
            '     /__)  _    /   / _)  _ _/_ _   _    o   ',
            '    / ( ()//)(/(() /__)()/ (/(- /_ (//\\//    ',
            '                                             ',
            '                                             ',
            '                                    ' + CONFIG.LAST_YEAR + '     ',
            '                                             ',

        ].join('\r\n');


        console.log('%c'+signature, 'font-size: 11px; color: #333333; background: #F6F6F6; ');

    }
);


