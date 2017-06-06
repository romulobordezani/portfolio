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
        ["$routeProvider", "$mdThemingProvider", "AngularyticsProvider", "plangularConfigProvider", function ( $routeProvider, $mdThemingProvider, AngularyticsProvider, plangularConfigProvider ) {
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
                    animation: 'fade'
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

        }]

).run(
    ["$rootScope", "$timeout", "$templateCache", "$http", "Angularytics", "Animator", function ( $rootScope, $timeout, $templateCache, $http, Angularytics, Animator ) {

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

    }]
);



'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:appController
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('appController', ['$scope', '$mdSidenav','leftMenuService', '$location', '$rootScope', 'workProvider', 'favicoProvider', '$timeout',
        function( $scope, $mdSidenav, leftMenuService, $location, $rootScope, workProvider, favicoProvider, $timeout ){

            function init(){
                attachEvents();
                menu.loadService();
                workSwitcher.init();
            }

            function attachEvents(){

                $rootScope.$on('$routeChangeStart', function(event, currRoute /* , prevRoute */ ){

                    menu.selectMenuItemByUrl();
                    favicoProvider.blow();
                    menu.blowHome();
                    $rootScope.contactButtonVisibility = true;
                    $rootScope.onWorkPage = false;
                    $rootScope.routeclass = currRoute.routeclass;
                    $rootScope.$$listeners.$mdTabsChanged=[];
                    $scope.animation = currRoute.animation || 'fade';
                    $scope.showFooter = currRoute.showFooter || false;

                });

                $rootScope.$on('forceAnimationSet', function(event, args) {
                    $scope.animation = args.animation;
                });

            }



            var blowingTimeout;
            var menu = {

                init : function(){
                    this.setListeners();
                    this.selectMenuItemByUrl();
                },

                setListeners : function(){

                    $scope.toggleSidenav = function(menuId) {
                        $mdSidenav(menuId).toggle();
                    };

                    $scope.menuClick = function( menuItem, e ) {

                        $scope.selected = angular.isNumber(menuItem) ? $scope.leftMenuList[menuItem] : menuItem;

                        $mdSidenav('leftMenu').toggle().then(function () {

                            if( menuItem.href.indexOf('http') > -1 ){

                                window.open(
                                    menuItem.href
                                );

                            }else{
                                $location.path(menuItem.href);
                            }

                        });

                        e.preventDefault();

                    };


                    $scope.swipeLeftMenu = function(){
                        $mdSidenav('leftMenu').close();
                    };

                    $scope.blowOnClick = function(){
                        $location.path('/');
                        menu.blowHome();
                    };


                },

                loadService : function(){

                    leftMenuService
                        .loadMenu()
                        .then( function( leftMenu ) {
                            $scope.leftMenuList = [].concat(leftMenu);
                            menu.init();
                        });

                },

                selectMenuItemByUrl : function(){
                    for( var i=0; i < $scope.leftMenuList.length; i++ ){
                        if( $location.path().indexOf( $scope.leftMenuList[i].href) >= 0 ){
                            $scope.selected = $scope.leftMenuList[i];
                        }
                    }
                },

                blowHome : function(){

                    $rootScope.blow = true;
                    //clearTimeout(blowingTimeout);

                    blowingTimeout = $timeout( function(){

                        $rootScope.blow = false;
                    }, 1500);



                }

            };

            var workSwitcher = {

                init : function(){

                    var alreadyLoaded = 0;

                    $scope.workSwitcherVisibility =  workProvider.getWorkSwitcherVisibility();
                    $scope.yearSlider = 2016;

                    $scope.$watch('yearSlider', function(value){

                        if( workSwitcher.isWorkPage() && alreadyLoaded > 0 ){
                            workProvider.resetCurrent();
                            workProvider.setWorkYear( value, true, false);
                        }

                        alreadyLoaded++;

                    });

                    this.setListeners();

                },

                changeYear : function(){
                    $scope.yearSlider = workProvider.getWorkYear();
                },

                setListeners : function(){

                    $rootScope.$on( 'changeWorkSwitcherVisibility', function(){
                        $scope.workSwitcherVisibility =  workProvider.getWorkSwitcherVisibility();
                    });

                    $rootScope.$on( 'changeWorkYear', workSwitcher.changeYear );


                    $rootScope.$on('$routeChangeSuccess', function(){

                        if( ! workSwitcher.isWorkPage() ){
                            workProvider.setWorkSwitcherVisibility(false);
                        }

                    });

                },

                isWorkPage : function(){
                    return  $location.path().indexOf('/work') >= 0 ;
                }

            };

            init();

        }
    ]);

'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:aboutController
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('aboutController', ["$rootScope", function ($rootScope){

        $rootScope.$on('$mdTabsChanged', function(e){
           console.log(e);
        });

    }]);

'use strict';

angular.module('rbApp')
    .controller('workController', ["$scope", "$mdDialog", "workProvider", "$rootScope", "$routeParams", "$timeout", function ($scope, $mdDialog, workProvider, $rootScope, $routeParams, $timeout ){

        function init(){

            $scope.current = $routeParams.current || false;
            $scope.year = $routeParams.year || 2015;
            workProvider.setDialogAlreadySeem(true);
            workProvider.setWorkSwitcherVisibility(true);
            $rootScope.onWorkPage = true;
            $rootScope.swiping = false;

            $timeout( function(){

                workProvider.setWorkYear( $scope.year, false, true );
                workProvider.setCurrent( $scope.current, false, true );

            }, 200);

        }

        $scope.setCurrent = function(clickedCard){
            if( !$rootScope.swiping ){
                workProvider.setCurrent(clickedCard, true);
            }
        };

        $scope.swipeLeft = function(){
            $rootScope.swiping = true;
            var newYear = parseInt($scope.year, 10) + 1;
            workProvider.setWorkYear(newYear, false, true);
        };

        $scope.swipeRight = function(){
            $rootScope.swiping = true;
            var newYear = parseInt($scope.year, 10) - 1;
            workProvider.setWorkYear(newYear, false, true);
        };

        init();

    }]
);

'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:contactController
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('contactController', ["$scope", "$http", "transformRequestAsFormPost", "$mdDialog", "Geolocation", "$rootScope", function ($scope, $http, transformRequestAsFormPost, $mdDialog, Geolocation, $rootScope ){

        var addressFullFilled = false;

        function init(){

            $scope.user = {
                name: '',
                email: '',
                phone: '',
                address: '',
                message: ''
            };

            $rootScope.contactButtonVisibility = false;

        }


        function fillAddressInput(position){

            var coordinates = position.coords.latitude + ',' + position.coords.longitude;

            $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + coordinates ).

                success(function(data) {
                    /*jshint camelcase: false */
                    $scope.user.address = data.results[0].formatted_address;
                    addressFullFilled = true;
                }).

                error(function(data) {
                    console.warn( 'Error loading Google Maps API: ', data );
                });

        }


        $scope.getGeolocation = function(){
            if( !addressFullFilled ){
                Geolocation.getLocation(fillAddressInput);
            }
        };


        $scope.sendEmail = function(){

            if( ! $scope.contactForm.$valid ){
                return false;
            }

            var request = $http({
                method: 'post',
                url: '/sendemail',
                data:  $scope.user
            });

            request.success(
                function() {

                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .title('Message Sent.')
                            .content('I will reply it as soon as possible.  Thank you. Cheers')
                            .ariaLabel('I will reply it as soon as possible. Thank you. Cheers')
                            .ok('Ok')
                    );

                    $scope.user = {
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        message: ''
                    };

                }
            );

        };


        init();

    }]);

'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('gamesController', function () {

    });

'use strict';

/**
 * @ngdoc function
 * @name rbApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rbApp
 */
angular.module('rbApp')
    .controller('homeController', ["$scope", "Utils", function ($scope, Utils) {
        $scope.goTo = Utils.goTo;
    }]);

/*jshint latedef: false */
(function(){
    'use strict';

    angular.module('rbApp')
        .service('leftMenuService', ['$q', LeftMenuService]);

            /**
             * Users DataService
             * Uses embedded, hard-coded data model; acts asynchronously to simulate
             * remote data service call(s).
             *
             * @returns {{loadAll: Function}}
             * @constructor
             */
            function LeftMenuService($q){
                var leftMenu = [

                    {
                        label: 'HOME',
                        alt: 'Home',
                        href: '/',
                        target : '',
                        imgsrc: 'images/menu/home.svg'
                    },

                    {
                        label: 'ABOUT',
                        alt: 'About',
                        href: '/about',
                        target : '',
                        imgsrc: 'images/menu/about.svg'
                    },


                    {
                        label: 'WORK',
                        alt: 'Work',
                        href: '/work/2016',
                        target : '',
                        imgsrc: 'images/menu/work.svg'
                    },

                    /*{
                        label: 'SOPHIA\'S PICS',
                        alt: 'Sophia',
                        href: '/sophia',
                        target : '',
                        imgsrc: 'images/menu/sophia.svg'
                    },*/

                    /*{
                        label: 'Blog',
                        alt: 'Blog - Modernet',
                        href: 'http://modernet.com.br/',
                        target : '',
                        imgsrc: 'images/menu/blog.svg'
                    },*/

                    {
                        label: 'CONTACT',
                        alt: 'Contact',
                        href: '/contact',
                        target : '',
                        imgsrc: 'images/menu/contact.svg'
                    }

                ];


                return {
                    loadMenu : function() {
                        return $q.when(leftMenu);
                    }
                };
            }

})();

/*jshint latedef: false */
(function(){
    'use strict';

    angular.module('rbApp')
        .service('homeService', ['$q', HomeService]);

            /**
             * Users DataService
             * Uses embedded, hard-coded data model; acts asynchronously to simulate
             * remote data service call(s).
             *
             * @returns {{loadAll: Function}}
             * @constructor
             */
            function HomeService($q){
                var home = [

                    {
                        label: 'GIT HUB',
                        alt: 'Git hub',
                        target : '_BLANK',
                        href: 'https://github.com/romulobordezani/',
                        imgsrc: 'images/github.png'
                    },

                    {
                        label: 'TWITTER',
                        alt: 'Twitter',
                        target : '_BLANK',
                        href: 'https://twitter.com/romulobordezani',
                        imgsrc: 'images/twitter.png'
                    },

                    {
                        label: 'LINKED-IN',
                        alt: 'Linked-in',
                        target : '_BLANK',
                        href: 'https://www.linkedin.com/profile/view?id=77218198',
                        imgsrc: 'images/linkedin.png'
                    },

                    {
                        label: 'PINTEREST',
                        alt: 'Pinterest',
                        target : '_BLANK',
                        href: 'https://www.pinterest.com/romulobordezani/',
                        imgsrc: 'images/pinterest.png'
                    }

                ];


                return {
                    loadHome : function() {
                        return $q.when(home);
                    }
                };
            }

})();

'use strict';
angular.module('rbApp')
    .provider('workProvider', function WorkProvider() {
        this.$get = ['$rootScope', '$location', '$timeout', 'Utils', function($rootScope, $location, $timeout) {

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

                if( newYear < 2002  ){
                    newYear = 2002;
                }

                if( newYear > 2016  ){
                    newYear = 2016;
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


            this.goTo = function(url,target){
                
                var isntAnAngularUrl = url.indexOf('http' ) >= 0 ? true : false || url.indexOf('/images' ) === 0 ;

                if( isntAnAngularUrl ){

                    if( target === '_blank'  ){
                        window.open( url );
                        return false;
                    }

                    if( url.indexOf('/images' ) === 0  ){
                        url = 'http://' + window.location.host + url;
                        window.open( url );
                        return false;
                    }

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

'use strict';
angular.module('rbApp').factory(
    'transformRequestAsFormPost',
    function() {

        function serializeData( data ) {

            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {
                return( ( data === null ) ? '' : data.toString() );
            }

            var buffer = [];

            // Serialize each key in the object.
            for ( var name in data ) {

                if (!data.hasOwnProperty(name)) {

                    continue;

                }

                var value = data[ name ];

                buffer.push(
                    encodeURIComponent( name ) +
                    '=' +
                    encodeURIComponent( ( value === null ) ? '' : value )
                );

            }

            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                    .join( '&' )
                    .replace( /%20/g, '+' )
                ;

            return( source );

        }

        function transformRequest( data, getHeaders ) {
            var headers = getHeaders();
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=iso-8859-1';
            return( serializeData( data ) );
        }

        return( transformRequest );

    }
);

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

'use strict';

angular.module('rbApp')
    .provider('favicoProvider', [function() {

            this.$get = function() {

                var favico = new Favico({
                    animation : 'none'
                });

                var badge = function(num) {
                    favico.badge(num);
                };

                var reset = function() {
                    favico.reset();
                };

                var setImage = function(image) {
                    favico.image(image);
                };


                var faviconManager = {

                    faviconEvenOdd : false,

                    blow : function(){

                        var faviconInterval = setInterval( faviconManager.reloadFavicon, 200 );

                        setTimeout( function(){
                            clearInterval( faviconInterval);
                        }, 2000 ) ;

                    },

                    reloadFavicon : function(){

                        var image;
                        faviconManager.faviconEvenOdd = !faviconManager.faviconEvenOdd;

                        if( faviconManager.faviconEvenOdd ){
                            image = document.getElementById('cock1');
                        }else{
                            image = document.getElementById('cock2');
                        }

                        setImage(image);

                    }

                };

                return {
                    badge : badge,
                    reset : reset,
                    setImage : setImage,
                    blow : faviconManager.blow
                };

            };

    }]
);

'use strict';
/*jshint unused:false*/
/**
 * Based in http://javascript.info/tutorial/animation
 * Thanks Kantor! ( Ilya Kantor, 2011. ) - It's works...
 */
angular.module('rbApp')
    .provider('Animator', [function(){

            this.$get = function() {

                function elastic(progress) {
                    return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * progress);
                }

                function linear(progress) {
                    return progress;
                }

                function quad(progress) {
                    return Math.pow(progress, 2);
                }

                function quint(progress) {
                    return Math.pow(progress, 5);
                }

                function circ(progress) {
                    return 1 - Math.sin(Math.acos(progress));
                }

                function back(progress) {
                    return Math.pow(progress, 2) * ((1.5 + 1) * progress - 1.5);
                }

                function bounce(progress) {
                    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                        if (progress >= (7 - 4 * a) / 11) {
                            return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                        }
                    }
                }

                function makeEaseInOut(delta) {
                    return function (progress) {
                        if (progress < 0.5){
                            return delta(2 * progress) / 2;
                        }else{
                            return (2 - delta(2 * (1 - progress))) / 2;
                        }
                    };
                }

                function makeEaseOut(delta) {
                    return function (progress) {
                        return 1 - delta(1 - progress);
                    };
                }

                var quadEaseOut = makeEaseOut(quint);


                function animate(opts) {

                    var start = new Date();
                    var intervalId = setInterval(function () {

                        var timePassed = new Date() - start;
                        var progress = timePassed / opts.duration;

                        if (progress > 1) {
                            progress = 1;
                        }

                        var delta = opts.delta(progress);

                        opts.step(delta);

                        if (progress === 1) {
                            clearInterval(intervalId);
                        }

                    }, opts.delay || 10);

                }


                function scrollToTabTop(){

                    var trueWindow = document.getElementById('ngview-container'),
                        windowWidth = window.screen.width,
                        to,
                        startedScroll = trueWindow.scrollTop;

                    if( windowWidth >= 960 ){
                        to = 290;
                    }

                    if( windowWidth >= 1200 ){
                        to = 290;
                    }

                    if( windowWidth < 960 ){
                        to = 290;
                    }

                    if( startedScroll === to ){
                        return false;
                    }

                    animate({

                        delay : 10,
                        duration : 666,
                        delta : quadEaseOut,

                        step : function(delta) {
                            var finalTo = ( to * delta );
                            if( finalTo > startedScroll ){
                                trueWindow.scrollTop = Math.ceil(finalTo);
                            }
                        }

                    });

                }


                function scrollTo(element, to, duration) {
                    if (duration <= 0) {
                        return;
                    }
                    var difference = to - element.scrollTop;
                    var perTick = difference / duration * 10;

                    setTimeout(function() {
                        element.scrollTop = element.scrollTop + perTick;
                        if (element.scrollTop === to) {
                            return;
                        }
                        scrollTo(element, to, duration - 10);
                    }, 10);
                }


                return {
                    scrollToTabTop : scrollToTabTop,
                    scrollTo : scrollTo,
                    animate : animate
                };

            };


    }]
);

'use strict';
angular.module('mdParallax', []).directive('mdParallax', [
    '$window', 'Utils', function ($window, Utils) {

        return {

            restrict: 'A',

            scope: {
                parallaxCss: '@',
                parallaxInitVal: '@',
                parallaxInitValXs: '@',
                parallaxInitValSm: '@',
                parallaxInitValMd: '@',
                parallaxInitValLg: '@',
                parallaxInitValRandom: '@',
                parallaxMaxVal: '@',
                parallaxRatio: '@',
                parallaxScroller: '@'
            },

            link: function(iScope, iElem) {

                var cssKey,
                    cssValue,
                    isSpecialVal,
                    parallaxCssVal,
                    parallaxRatio,
                    parallaxScroller,
                    parallaxInitVal,
                    parallaxMaxVal,
                    cssValArray,
                    toFirefoxParallaxInitVal,
                    pureCssVal,
                    width;

                parallaxCssVal = iScope.parallaxCss ? iScope.parallaxCss : 'top';
                cssValArray = parallaxCssVal.split(':');
                pureCssVal = iScope.parallaxCss;
                cssKey = cssValArray[0];
                cssValue = cssValArray[1];
                width = Utils.getBootstrapGridSize();

                isSpecialVal = cssValue ? true : false;

                if (!cssValue) {
                    cssValue = cssKey;
                }

                parallaxRatio = iScope.parallaxRatio ? +iScope.parallaxRatio : 1.1;

                if( iScope.parallaxInitValXs && width === 'xs' ){
                    parallaxInitVal = +iScope.parallaxInitValXs;
                }else if(iScope.parallaxInitValSm && width === 'sm'  ){
                    parallaxInitVal = +iScope.parallaxInitValSm;
                }else if(iScope.parallaxInitValMd && width === 'md' ){
                    parallaxInitVal = +iScope.parallaxInitValMd;
                }else if( iScope.parallaxInitValLg && width === 'lg' ){
                    parallaxInitVal = +iScope.parallaxInitValLg;
                }else{
                    parallaxInitVal = +iScope.parallaxInitVal || 0;
                }


                if( iScope.parallaxInitValRandom  ) {
                    parallaxInitVal = Math.floor((Math.random()*iScope.parallaxInitValRandom)+1);
                }








                parallaxMaxVal  = iScope.parallaxMaxVal ? parseInt( iScope.parallaxMaxVal, 10 ) : null;
                parallaxScroller = iScope.parallaxScroller;
                var trueWindow = document.getElementById(parallaxScroller) || $window ;

                if( pureCssVal === 'background-position-y' ) {
                    cssKey = 'background-position';
                    toFirefoxParallaxInitVal = 'center ' + parallaxInitVal + 'px';

                }else if(pureCssVal === 'opacity'){
                    toFirefoxParallaxInitVal = parallaxInitVal;
                }else{
                    toFirefoxParallaxInitVal = parallaxInitVal + 'px';
                }

                iElem.css( cssKey, toFirefoxParallaxInitVal );



                function _onScroll() {

                    var resultVal;

                    var calcVal = trueWindow.scrollTop * parallaxRatio + parallaxInitVal;

                    if ( calcVal >= parallaxMaxVal && parallaxMaxVal !== null ){
                        calcVal = parallaxMaxVal;
                    }

                    if (isSpecialVal) {
                        resultVal = '' + cssValue + '(' + calcVal + 'px)';
                    } else {
                        resultVal = calcVal + 'px';
                    }

                    if( pureCssVal === 'background-position-y' ){
                        cssKey = 'background-position';
                        resultVal = 'center ' + resultVal;
                    }else if( pureCssVal === 'opacity' ) {
                        resultVal = 0 + ( calcVal / 500 ) ;
                    }

                    iElem.css(cssKey, resultVal);

                }



                //if( window.screen.width > 360 ){

                //if( window.screen.width > 360 || pureCssVal === 'opacity' ){

                    trueWindow.addEventListener('scroll', _onScroll);
                //}

            }
        };
    }
]);

'use strict';
angular.module('addClassOnClick', []).directive('clickable', [ 'Utils', '$timeout',
     function (Utils, $timeout) {
        return {

            restrict: 'A',

            link: function(scope, element, attrs) {

                element.addClass('clickable noselect');

                element.bind('click', function() {

                    element.addClass('clicked');

                    $timeout(function(){
                        Utils.goTo(attrs.clickableUrl, attrs.clickableTarget);
                        element.removeClass('clicked');
                    }, 666 );

                });

            }
        };

     }
]);

'use strict';
angular.module('deviceFrame', []).directive('deviceFrame',[ '$mdDialog',
        function($mdDialog) {
            return {

                restrict: 'E',
                transclude: true,
                templateUrl : 'views/templates/deviceFrame.directive.html',

                scope: {
                    href: '@',
                    size : '@',
                    src : '@'
                },

                link: function(scope, element, attrs) {

                    scope.href = attrs.href;
                    scope.size = attrs.size;
                    scope.src  = attrs.src;


                    scope.showImage = function(){

                        var fullSrc = attrs.src.replace(/(\-thumb)/g, '');

                        $mdDialog.show({

                            clickOutsideToClose: true,
                            scope: scope,
                            preserveScope: true,
                            template:   '<md-dialog>' +
                                        '  <md-dialog-content  >' +
                                        '     <a  target="_blank" href="' + fullSrc + '" >' +
                                        '       <img class="md-whiteframe-z2" style="width: 100%; height: auto;" src="' + fullSrc + '" />' +
                                        '     </a>' +
                                        '  </md-dialog-content>' +
                                        '  <div class="md-actions">' +

                                        '    <md-button class="md-icon-button" ng-click="launch()">' +
                                        '      <md-icon md-svg-src="images/uis/ic_launch_black_24px.svg" aria-label="Launch"></md-icon>'+
                                        '    </md-button>' +

                                        '    <md-button ng-click="closeDialog()" class="md-icon-button" >' +
                                        '      <md-icon md-svg-src="images/uis/ic_close_24px.svg" aria-label="Close"></md-icon>'+
                                        '    </md-button>' +

                                        '  </div>' +
                                        '</md-dialog>',

                            controller: ["$scope", "$mdDialog", function DialogController($scope, $mdDialog) {

                                $scope.closeDialog = function() {
                                    $mdDialog.hide();
                                };

                                $scope.launch = function() {
                                    window.open( fullSrc );
                                };
                            }]


                        });

                    };

                }

            };

     }]
);

'use strict';
angular.module('responsibilities', []).directive('responsibilities',
        function() {
            return {

                restrict: 'E',
                transclude: true,
                templateUrl : 'views/templates/responsibilities.directive.html',

                scope: {
                    frontend: '=?',
                    backend : '=?',
                    database : '=?',
                    ux : '=?',
                    design : '=?',
                    tests : '=?',
                    headline : '=?',
                    custom : '=?',
                    customImg : '=?',
                    customLabel : '=?',
                    custom1 : '=?',
                    customImg1 : '=?',
                    customLabel1 : '=?',
                    custom2 : '=?',
                    customImg2 : '=?',
                    customLabel2 : '=?'
                }

                // ,link: function(scope, element, attrs) {}

            };

     }
);

'use strict';
angular.module('slideOnSwipe', []).directive('slideOnSwipe', [ '$swipe', '$rootScope',
        function($swipe,$rootScope) {

            return {

                restrict: 'A',

                scope: {
                    onlyLeft : '=',
                    onlyRight : '='
                },

                link: function(scope, ele /* , attrs, ctrl */ ) {

                    var startX, pointX;

                    $swipe.bind(ele, {

                        'start': function(coords) {
                            startX = coords.x;
                            pointX = coords.y;
                            $rootScope.swiping = true;
                        },

                        'move': function(coords) {
                            var delta = coords.x - pointX;
                            angular.element(ele).parent().css('transform','translate3d(' + delta + 'px,0,0)');
                        },

                        'end': function(coords) {

                            if( scope.onlyLeft && coords.x <= startX ){
                                angular.element(ele).parent().css('transform','translate3d(0px,0,0)');
                            }

                            if( scope.onlyRight && coords.x >= startX ){
                                angular.element(ele).parent().css('transform','translate3d(0px,0,0)');
                            }

                            $rootScope.swiping = false;

                        },

                        'cancel': function() {
                            angular.element(ele).parent().css('transform','translate3d(0px,0,0)');
                            $rootScope.swiping = false;
                        }

                    });
                }

            };

        }]
);

'use strict';
angular.module('rbApp').filter('randomize', function() {
    return function(input) {
        if ( input!==null && input!==undefined && input > 1) {
            return Math.floor((Math.random()*input)+1);
        }
    };
});

/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v0.9.0
 */
(function () {
"use strict";
/**
 * @ngdoc module
 * @name material.components.tabs
 * @description
 *
 *  Tabs, created with the `<md-tabs>` directive provide *tabbed* navigation with different styles.
 *  The Tabs component consists of clickable tabs that are aligned horizontally side-by-side.
 *
 *  Features include support for:
 *
 *  - static or dynamic tabs,
 *  - responsive designs,
 *  - accessibility support (ARIA),
 *  - tab pagination,
 *  - external or internal tab content,
 *  - focus indicators and arrow-key navigations,
 *  - programmatic lookup and access to tab controllers, and
 *  - dynamic transitions through different tab contents.
 *
 */
/*
 * @see js folder for tabs implementation
 */
angular.module('material.components.tabs', [
  'material.core',
  'material.components.icon'
]);

/**
 * @ngdoc directive
 * @name mdTab
 * @module material.components.tabs
 *
 * @restrict E
 *
 * @description
 * Use the `<md-tab>` a nested directive used within `<md-tabs>` to specify a tab with a **label** and optional *view content*.
 *
 * If the `label` attribute is not specified, then an optional `<md-tab-label>` tag can be used to specify more
 * complex tab header markup. If neither the **label** nor the **md-tab-label** are specified, then the nested
 * markup of the `<md-tab>` is used as the tab header markup.
 *
 * Please note that if you use `<md-tab-label>`, your content **MUST** be wrapped in the `<md-tab-body>` tag.  This
 * is to define a clear separation between the tab content and the tab label.
 *
 * If a tab **label** has been identified, then any **non-**`<md-tab-label>` markup
 * will be considered tab content and will be transcluded to the internal `<div class="md-tabs-content">` container.
 *
 * This container is used by the TabsController to show/hide the active tab's content view. This synchronization is
 * automatically managed by the internal TabsController whenever the tab selection changes. Selection changes can
 * be initiated via data binding changes, programmatic invocation, or user gestures.
 *
 * @param {string=} label Optional attribute to specify a simple string as the tab label
 * @param {boolean=} disabled If present, disabled tab selection.
 * @param {expression=} md-on-deselect Expression to be evaluated after the tab has been de-selected.
 * @param {expression=} md-on-select Expression to be evaluated after the tab has been selected.
 *
 *
 * @usage
 *
 * <hljs lang="html">
 * <md-tab label="" disabled="" md-on-select="" md-on-deselect="" >
 *   <h3>My Tab content</h3>
 * </md-tab>
 *
 * <md-tab >
 *   <md-tab-label>
 *     <h3>My Tab content</h3>
 *   </md-tab-label>
 *   <md-tab-body>
 *     <p>
 *       Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
 *       totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
 *       dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
 *       sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
 *     </p>
 *   </md-tab-body>
 * </md-tab>
 * </hljs>
 *
 */
angular
    .module('material.components.tabs')
    .directive('mdTab', MdTab);

function MdTab () {
  return {
    require: '^?mdTabs',
    terminal: true,
    scope: {
      label:    '@',
      active:   '=?mdActive',
      disabled: '=?ngDisabled',
      select:   '&?mdOnSelect',
      deselect: '&?mdOnDeselect'
    },
    link: postLink
  };

  function postLink (scope, element, attr, ctrl) {

    if (!ctrl) return;
    var tabs = element.parent()[0].getElementsByTagName('md-tab'),
        index = Array.prototype.indexOf.call(tabs, element[0]),
        data = ctrl.insertTab({
          scope:    scope,
          parent:   scope.$parent,
          index:    index,
          template: getTemplate(),
          label:    getLabel()
        }, index);

    scope.select   = scope.select   || angular.noop;
    scope.deselect = scope.deselect || angular.noop;

    scope.$watch('active', function (active) { if (active) ctrl.select(data.getIndex()); });
    scope.$watch('disabled', function () { ctrl.refreshIndex(); });
    scope.$on('$destroy', function () { ctrl.removeTab(data); });

    function getLabel () {
      var label = attr.label || (element.find('md-tab-label')[0] || element[0]).innerHTML;
      return getLabelAttribute() || getLabelElement() || getElementContents();
      function getLabelAttribute () { return attr.label; }
      function getLabelElement () {
        var label = element.find('md-tab-label');
        if (label.length) return label.remove().html();
      }
      function getElementContents () {
        var html = element.html();
        element.empty();
        return html;
      }
    }

    function getTemplate () {
      var content = element.find('md-tab-body'),
          template = content.length ? content.html() : attr.label ? element.html() : null;
      if (content.length) content.remove();
      else if (attr.label) element.empty();
      return template;
    }
  }
}

angular
    .module('material.components.tabs')
    .directive('mdTabItem', MdTabItem);

function MdTabItem () {
  return { require: '^?mdTabs', link: link };
  function link (scope, element, attr, ctrl) {
    if (!ctrl) return;
    ctrl.attachRipple(scope, element);
  }
}

angular.module('material.components.tabs')
    .directive('mdTabScroll', MdTabScroll);

function MdTabScroll ($parse) {
  return {
    restrict: 'A',
    compile: function ($element, attr) {
      var fn = $parse(attr.mdTabScroll, null, true);
      return function ngEventHandler (scope, element) {
        element.on('mousewheel', function (event) {
          scope.$apply(function () { fn(scope, { $event: event }); });
        });
      };
    }
  }
}
MdTabScroll.$inject = ["$parse"];

angular
    .module('material.components.tabs')
    .controller('MdTabsController', MdTabsController);

function MdTabsController ($scope, $element, $window, $timeout, $mdConstant, $mdInkRipple, $mdUtil, $animate, $rootScope) {

    var ctrl     = this,
        locked   = false,
        elements = getElements(),
        queue    = [];

  ctrl.scope = $scope;
  ctrl.parent = $scope.$parent;
  ctrl.tabs = [];
  ctrl.lastSelectedIndex = null;
  ctrl.focusIndex = 0;
  ctrl.offsetLeft = 0;
  ctrl.hasContent = false;
  ctrl.hasFocus = false;
  ctrl.lastClick = false;

  ctrl.redirectFocus = redirectFocus;
  ctrl.attachRipple = attachRipple;
  ctrl.shouldStretchTabs = shouldStretchTabs;
  ctrl.shouldPaginate = shouldPaginate;
  ctrl.shouldCenterTabs = shouldCenterTabs;
  ctrl.insertTab = insertTab;
  ctrl.removeTab = removeTab;
  ctrl.select = select;
  ctrl.scroll = scroll;
  ctrl.nextPage = nextPage;
  ctrl.previousPage = previousPage;
  ctrl.keydown = keydown;
  ctrl.canPageForward = canPageForward;
  ctrl.canPageBack = canPageBack;
  ctrl.refreshIndex = refreshIndex;
  ctrl.incrementSelectedIndex = incrementSelectedIndex;
  ctrl.updateInkBarStyles = updateInkBarStyles;

  init();

  function init () {
    $scope.$watch('selectedIndex', handleSelectedIndexChange);
    $scope.$watch('$mdTabsCtrl.focusIndex', handleFocusIndexChange);
    $scope.$watch('$mdTabsCtrl.offsetLeft', handleOffsetChange);
    $scope.$watch('$mdTabsCtrl.hasContent', handleHasContent);
    angular.element($window).on('resize', function () { $scope.$apply(handleWindowResize); });
    $timeout(updateInkBarStyles, 0, false);
    $timeout(updateHeightFromContent, 0, false);
  }

  function handleHasContent (hasContent) {
    $element[hasContent ? 'removeClass' : 'addClass']('md-no-tab-content');
  }

  function getElements () {
    var elements      = {};

    //-- gather tab bar elements
    elements.wrapper  = $element[0].getElementsByTagName('md-tabs-wrapper')[0];
    elements.canvas   = elements.wrapper.getElementsByTagName('md-tabs-canvas')[0];
    elements.paging   = elements.canvas.getElementsByTagName('md-pagination-wrapper')[0];
    elements.tabs     = elements.paging.getElementsByTagName('md-tab-item');
    elements.dummies  = elements.canvas.getElementsByTagName('md-dummy-tab');
    elements.inkBar   = elements.paging.getElementsByTagName('md-ink-bar')[0];

    //-- gather tab content elements
    elements.contentsWrapper = $element[0].getElementsByTagName('md-tabs-content-wrapper')[0];
    elements.contents = elements.contentsWrapper.getElementsByTagName('md-tab-content');

    return elements;
  }

  function keydown (event) {
    switch (event.keyCode) {
      case $mdConstant.KEY_CODE.LEFT_ARROW:
        event.preventDefault();
        incrementSelectedIndex(-1, true);
        break;
      case $mdConstant.KEY_CODE.RIGHT_ARROW:
        event.preventDefault();
        incrementSelectedIndex(1, true);
        break;
      case $mdConstant.KEY_CODE.SPACE:
      case $mdConstant.KEY_CODE.ENTER:
        event.preventDefault();
        if (!locked) $scope.selectedIndex = ctrl.focusIndex;
        break;
    }
    ctrl.lastClick = false;
  }

  function incrementSelectedIndex (inc, focus) {
    var newIndex,
        index = focus ? ctrl.focusIndex : $scope.selectedIndex;
    for (newIndex = index + inc;
         ctrl.tabs[newIndex] && ctrl.tabs[newIndex].scope.disabled;
         newIndex += inc) {}
    if (ctrl.tabs[newIndex]) {
      if (focus) ctrl.focusIndex = newIndex;
      else $scope.selectedIndex = newIndex;
    }
  }

  function handleOffsetChange (left) {
    var newValue = shouldCenterTabs() ? '' : '-' + left + 'px';
    angular.element(elements.paging).css('left', newValue);
    $scope.$broadcast('$mdTabsPaginationChanged');

  }

  function handleFocusIndexChange (newIndex, oldIndex) {
    if (newIndex === oldIndex) return;
    if (!elements.tabs[newIndex]) return;
    adjustOffset();
    redirectFocus();
  }

  function redirectFocus () {
    elements.dummies[ctrl.focusIndex].focus();
  }

  function adjustOffset () {
    if (shouldCenterTabs()) return;
    var tab = elements.tabs[ctrl.focusIndex],
        left = tab.offsetLeft,
        right = tab.offsetWidth + left;
    ctrl.offsetLeft = Math.max(ctrl.offsetLeft, fixOffset(right - elements.canvas.clientWidth));
    ctrl.offsetLeft = Math.min(ctrl.offsetLeft, fixOffset(left));
  }

  function handleWindowResize () {
    ctrl.lastSelectedIndex = $scope.selectedIndex;
    ctrl.offsetLeft = fixOffset(ctrl.offsetLeft);
    $timeout(updateInkBarStyles, 0, false);
  }

  function processQueue () {
    queue.forEach(function (func) { $timeout(func); });
    queue = [];
  }

  function insertTab (tabData, index) {
    var proto = {
          getIndex: function () { return ctrl.tabs.indexOf(tab); },
          isActive: function () { return this.getIndex() === $scope.selectedIndex; },
          isLeft:   function () { return this.getIndex() < $scope.selectedIndex; },
          isRight:  function () { return this.getIndex() > $scope.selectedIndex; },
          hasFocus: function () { return !ctrl.lastClick && ctrl.hasFocus && this.getIndex() === ctrl.focusIndex; },
          id:       $mdUtil.nextUid()
        },
        tab = angular.extend(proto, tabData);
    if (angular.isDefined(index)) {
      ctrl.tabs.splice(index, 0, tab);
    } else {
      ctrl.tabs.push(tab);
    }
    processQueue();
    updateHasContent();
    return tab;
  }

  function updateHasContent () {
    var hasContent = false;
    angular.forEach(ctrl.tabs, function (tab) {
      if (tab.template) hasContent = true;
    });
    ctrl.hasContent = hasContent;
  }

  function removeTab (tabData) {
    ctrl.tabs.splice(tabData.getIndex(), 1);
    refreshIndex();
    $timeout(function () {
      updateInkBarStyles();
      ctrl.offsetLeft = fixOffset(ctrl.offsetLeft);
    });
  }

  function refreshIndex () {
    $scope.selectedIndex = getNearestSafeIndex($scope.selectedIndex);
    ctrl.focusIndex = getNearestSafeIndex(ctrl.focusIndex);
  }

  function handleSelectedIndexChange (newValue, oldValue) {
      

      if (newValue === oldValue) return;

      $scope.selectedIndex = getNearestSafeIndex(newValue);
      ctrl.lastSelectedIndex = oldValue;
      updateInkBarStyles();
      updateHeightFromContent();
      $scope.$broadcast('$mdTabsChanged');
      $rootScope.$broadcast('$mdTabsChanged');
      ctrl.tabs[oldValue] && ctrl.tabs[oldValue].scope.deselect();
      ctrl.tabs[newValue] && ctrl.tabs[newValue].scope.select();

      if ( window.screen.width < 360 ){
          if (newValue > oldValue && newValue >= 3) {
              ctrl.nextPage();
          } else if (newValue !== 3) {
              ctrl.previousPage();
          }
      }

      if ( window.screen.width >= 360 ){
          if (newValue > oldValue && newValue >= 3) {
              ctrl.nextPage();
          } else if (newValue !== 4) {
              ctrl.previousPage();
          }
      }

  }

  function handleResizeWhenVisible () {
    //-- if there is already a watcher waiting for resize, do nothing
    if (handleResizeWhenVisible.watcher) return;
    //-- otherwise, we will abuse the $watch function to check for visible
    handleResizeWhenVisible.watcher = $scope.$watch(function () {
      //-- since we are checking for DOM size, we use $timeout to wait for after the DOM updates
      $timeout(function () {
        //-- if the watcher has already run (ie. multiple digests in one cycle), do nothing
        if (!handleResizeWhenVisible.watcher) return;

        if ($element.prop('offsetParent')) {
          handleResizeWhenVisible.watcher();
          handleResizeWhenVisible.watcher = null;

          //-- we have to trigger our own $apply so that the DOM bindings will update
          $scope.$apply(handleWindowResize);
        }
      }, 0, false);
    });
  }

  function updateHeightFromContent () {
    if (!$scope.dynamicHeight) return $element.css('height', '');
    if (!ctrl.tabs.length) return queue.push(updateHeightFromContent);
    var tabContent    = elements.contents[$scope.selectedIndex],
        contentHeight = tabContent ? tabContent.offsetHeight : 0,
        tabsHeight    = elements.wrapper.offsetHeight,
        newHeight     = contentHeight + tabsHeight,
        currentHeight = $element.prop('clientHeight');
    if (currentHeight === newHeight) return;
    locked = true;
    $animate
        .animate(
          $element,
          { height: currentHeight + 'px' },
          { height: newHeight + 'px'}
        )
        .then(function () {
          $element.css('height', '');
          locked = false;
        });
  }

  function updateInkBarStyles () {
    if (!ctrl.tabs.length) return queue.push(updateInkBarStyles);
    //-- if the element is not visible, we will not be able to calculate sizes until it is
    //-- we should treat that as a resize event rather than just updating the ink bar
    if (!$element.prop('offsetParent')) return handleResizeWhenVisible();
    var index = $scope.selectedIndex,
        totalWidth = elements.paging.offsetWidth,
        tab = elements.tabs[index],
        left = tab.offsetLeft,
        right = totalWidth - left - tab.offsetWidth;
    updateInkBarClassName();
    angular.element(elements.inkBar).css({ left: left + 'px', right: right + 'px' });
  }

  function updateInkBarClassName () {
    var newIndex = $scope.selectedIndex,
        oldIndex = ctrl.lastSelectedIndex,
        ink = angular.element(elements.inkBar);
    ink.removeClass('md-left md-right');
    if (!angular.isNumber(oldIndex)) return;
    if (newIndex < oldIndex) {
      ink.addClass('md-left');
    } else if (newIndex > oldIndex) {
      ink.addClass('md-right');
    }
  }

  function getNearestSafeIndex(newIndex) {

    var maxOffset = Math.max(ctrl.tabs.length - newIndex, newIndex),
        i, tab;
    for (i = 0; i <= maxOffset; i++) {
      tab = ctrl.tabs[newIndex + i];
      if (tab && (tab.scope.disabled !== true)) return tab.getIndex();
      tab = ctrl.tabs[newIndex - i];
      if (tab && (tab.scope.disabled !== true)) return tab.getIndex();
    }
    return newIndex;
  }

  function shouldStretchTabs () {
    switch ($scope.stretchTabs) {
      case 'always': return true;
      case 'never':  return false;
      default:       return !shouldPaginate() && $window.matchMedia('(max-width: 600px)').matches;
    }
  }

  function shouldCenterTabs () {
    return $scope.centerTabs && !shouldPaginate();
  }

  function shouldPaginate () {
    if ($scope.noPagination) return false;
    var canvasWidth = $element.prop('clientWidth');
    angular.forEach(elements.tabs, function (tab) { canvasWidth -= tab.offsetWidth; });
    return canvasWidth < 0;
  }

  function select (index) {
    if (!locked) ctrl.focusIndex = $scope.selectedIndex = index;
    ctrl.lastClick = true;
  }

  function scroll (event) {
    if (!shouldPaginate()) return;
    event.preventDefault();
    ctrl.offsetLeft = fixOffset(ctrl.offsetLeft - event.wheelDelta);
  }

  function fixOffset (value) {
    if (!elements.tabs.length || !shouldPaginate()) return 0;
    var lastTab = elements.tabs[elements.tabs.length - 1],
        totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
    value = Math.max(0, value);
    value = Math.min(totalWidth - elements.canvas.clientWidth, value);
    return value;
  }

  function nextPage () {

    var viewportWidth = elements.canvas.clientWidth,
        totalWidth = viewportWidth + ctrl.offsetLeft,
        i, tab;
    for (i = 0; i < elements.tabs.length; i++) {
      tab = elements.tabs[i];
      if (tab.offsetLeft + tab.offsetWidth > totalWidth) break;
    }
    ctrl.offsetLeft = fixOffset(tab.offsetLeft);
  }

  function previousPage () {
    var i, tab;
    for (i = 0; i < elements.tabs.length; i++) {
      tab = elements.tabs[i];
      if (tab.offsetLeft + tab.offsetWidth >= ctrl.offsetLeft) break;
    }
    ctrl.offsetLeft = fixOffset(tab.offsetLeft + tab.offsetWidth - elements.canvas.clientWidth);
  }

  function canPageBack () {
    return ctrl.offsetLeft > 0;
  }

  function canPageForward () {
    var lastTab = elements.tabs[elements.tabs.length - 1];
    return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth + ctrl.offsetLeft;
  }

  function attachRipple (scope, element) {
    var options = { colorElement: angular.element(elements.inkBar) };
    $mdInkRipple.attachTabBehavior(scope, element, options);
  }
}
MdTabsController.$inject = ["$scope", "$element", "$window", "$timeout", "$mdConstant", "$mdInkRipple", "$mdUtil", "$animate", "$rootScope"];

/**
 * @ngdoc directive
 * @name mdTabs
 * @module material.components.tabs
 *
 * @restrict E
 *
 * @description
 * The `<md-tabs>` directive serves as the container for 1..n `<md-tab>` child directives to produces a Tabs components.
 * In turn, the nested `<md-tab>` directive is used to specify a tab label for the **header button** and a [optional] tab view
 * content that will be associated with each tab button.
 *
 * Below is the markup for its simplest usage:
 *
 *  <hljs lang="html">
 *  <md-tabs>
 *    <md-tab label="Tab #1"></md-tab>
 *    <md-tab label="Tab #2"></md-tab>
 *    <md-tab label="Tab #3"></md-tab>
 *  </md-tabs>
 *  </hljs>
 *
 * Tabs supports three (3) usage scenarios:
 *
 *  1. Tabs (buttons only)
 *  2. Tabs with internal view content
 *  3. Tabs with external view content
 *
 * **Tab-only** support is useful when tab buttons are used for custom navigation regardless of any other components, content, or views.
 * **Tabs with internal views** are the traditional usages where each tab has associated view content and the view switching is managed internally by the Tabs component.
 * **Tabs with external view content** is often useful when content associated with each tab is independently managed and data-binding notifications announce tab selection changes.
 *
 * Additional features also include:
 *
 * *  Content can include any markup.
 * *  If a tab is disabled while active/selected, then the next tab will be auto-selected.
 *
 * ### Explanation of tab stretching
 *
 * Initially, tabs will have an inherent size.  This size will either be defined by how much space is needed to accommodate their text or set by the user through CSS.  Calculations will be based on this size.
 *
 * On mobile devices, tabs will be expanded to fill the available horizontal space.  When this happens, all tabs will become the same size.
 *
 * On desktops, by default, stretching will never occur.
 *
 * This default behavior can be overridden through the `md-stretch-tabs` attribute.  Here is a table showing when stretching will occur:
 *
 * `md-stretch-tabs` | mobile    | desktop
 * ------------------|-----------|--------
 * `auto`            | stretched | ---
 * `always`          | stretched | stretched
 * `never`           | ---       | ---
 *
 * @param {integer=} md-selected Index of the active/selected tab
 * @param {boolean=} md-no-ink If present, disables ink ripple effects.
 * @param {boolean=} md-no-bar If present, disables the selection ink bar.
 * @param {string=}  md-align-tabs Attribute to indicate position of tab buttons: `bottom` or `top`; default is `top`
 * @param {string=} md-stretch-tabs Attribute to indicate whether or not to stretch tabs: `auto`, `always`, or `never`; default is `auto`
 * @param {boolean=} md-dynamic-height When enabled, the tab wrapper will resize based on the contents of the selected tab
 * @param {boolean=} md-center-tabs When enabled, tabs will be centered provided there is no need for pagination
 * @param {boolean=} md-no-pagination When enabled, pagination will remain off
 *
 * @usage
 * <hljs lang="html">
 * <md-tabs md-selected="selectedIndex" >
 *   <img ng-src="img/angular.png" class="centered">
 *   <md-tab
 *       ng-repeat="tab in tabs | orderBy:predicate:reversed"
 *       md-on-select="onTabSelected(tab)"
 *       md-on-deselect="announceDeselected(tab)"
 *       ng-disabled="tab.disabled">
 *     <md-tab-label>
 *       {{tab.title}}
 *       <img src="img/removeTab.png" ng-click="removeTab(tab)" class="delete">
 *     </md-tab-label>
 *     <md-tab-body>
 *       {{tab.content}}
 *     </md-tab-body>
 *   </md-tab>
 * </md-tabs>
 * </hljs>
 *
 */
angular
    .module('material.components.tabs')
    .directive('mdTabs', MdTabs);

function MdTabs ($mdTheming, $mdUtil, $compile) {
  return {
    scope: {
      noPagination:  '=?mdNoPagination',
      dynamicHeight: '=?mdDynamicHeight',
      centerTabs:    '=?mdCenterTabs',
      selectedIndex: '=?mdSelected',
      stretchTabs:   '@?mdStretchTabs'
    },
    template: function (element, attr) {
      attr.$mdTabsTemplate = element.html();
      return '\
        <md-tabs-wrapper ng-class="{ \'md-stretch-tabs\': $mdTabsCtrl.shouldStretchTabs() }">\
          <md-tab-data></md-tab-data>\
          <md-prev-button\
              tabindex="-1"\
              role="button"\
              aria-label="Previous Page"\
              aria-disabled="{{!$mdTabsCtrl.canPageBack()}}"\
              ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageBack() }"\
              ng-if="$mdTabsCtrl.shouldPaginate()"\
              ng-click="$mdTabsCtrl.previousPage()">\
            <md-icon md-svg-icon="md-tabs-arrow"></md-icon>\
          </md-prev-button>\
          <md-next-button\
              tabindex="-1"\
              role="button"\
              aria-label="Next Page"\
              aria-disabled="{{!$mdTabsCtrl.canPageForward()}}"\
              ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageForward() }"\
              ng-if="$mdTabsCtrl.shouldPaginate()"\
              ng-click="$mdTabsCtrl.nextPage()">\
            <md-icon md-svg-icon="md-tabs-arrow"></md-icon>\
          </md-next-button>\
          <md-tabs-canvas\
              tabindex="0"\
              aria-activedescendant="tab-item-{{$mdTabsCtrl.tabs[$mdTabsCtrl.focusIndex].id}}"\
              ng-focus="$mdTabsCtrl.redirectFocus()"\
              ng-class="{\
                  \'md-paginated\': $mdTabsCtrl.shouldPaginate(),\
                  \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs()\
              }"\
              ng-keydown="$mdTabsCtrl.keydown($event)"\
              role="tablist">\
            <md-pagination-wrapper\
                ng-class="{ \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs() }"\
                md-tab-scroll="$mdTabsCtrl.scroll($event)">\
              <md-tab-item\
                  tabindex="-1"\
                  class="md-tab"\
                  style="max-width: {{ tabWidth ? tabWidth + \'px\' : \'none\' }}"\
                  ng-repeat="tab in $mdTabsCtrl.tabs"\
                  role="tab"\
                  aria-controls="tab-content-{{tab.id}}"\
                  aria-selected="{{tab.isActive()}}"\
                  aria-disabled="{{tab.scope.disabled || \'false\'}}"\
                  ng-click="$mdTabsCtrl.select(tab.getIndex())"\
                  ng-class="{\
                      \'md-active\':    tab.isActive(),\
                      \'md-focused\':   tab.hasFocus(),\
                      \'md-disabled\':  tab.scope.disabled\
                  }"\
                  ng-disabled="tab.scope.disabled"\
                  md-swipe-left="$mdTabsCtrl.nextPage()"\
                  md-swipe-right="$mdTabsCtrl.previousPage()"\
                  md-template="tab.label"\
                  md-scope="tab.parent"></md-tab-item>\
              <md-ink-bar ng-hide="noInkBar"></md-ink-bar>\
            </md-pagination-wrapper>\
            <div class="md-visually-hidden md-dummy-wrapper">\
              <md-dummy-tab\
                  tabindex="-1"\
                  id="tab-item-{{tab.id}}"\
                  role="tab"\
                  aria-controls="tab-content-{{tab.id}}"\
                  aria-selected="{{tab.isActive()}}"\
                  aria-disabled="{{tab.scope.disabled || \'false\'}}"\
                  ng-focus="$mdTabsCtrl.hasFocus = true"\
                  ng-blur="$mdTabsCtrl.hasFocus = false"\
                  ng-repeat="tab in $mdTabsCtrl.tabs"\
                  md-template="tab.label"\
                  md-scope="tab.parent"></md-dummy-tab>\
            </div>\
          </md-tabs-canvas>\
        </md-tabs-wrapper>\
        <md-tabs-content-wrapper ng-show="$mdTabsCtrl.hasContent">\
          <md-tab-content\
              id="tab-content-{{tab.id}}"\
              role="tabpanel"\
              aria-labelledby="tab-item-{{tab.id}}"\
              md-swipe-left="$mdTabsCtrl.incrementSelectedIndex(1)"\
              md-swipe-right="$mdTabsCtrl.incrementSelectedIndex(-1)"\
              ng-if="$mdTabsCtrl.hasContent"\
              ng-repeat="(index, tab) in $mdTabsCtrl.tabs" \
              md-template="tab.template"\
              md-scope="tab.parent"\
              ng-class="{\
                \'md-no-transition\': $mdTabsCtrl.lastSelectedIndex == null,\
                \'md-active\':        tab.isActive(),\
                \'md-left\':          tab.isLeft(),\
                \'md-right\':         tab.isRight(),\
                \'md-no-scroll\':     dynamicHeight\
              }"></md-tab-content>\
        </md-tabs-content-wrapper>\
      ';
    },
    controller: 'MdTabsController',
    controllerAs: '$mdTabsCtrl',
    link: function (scope, element, attr) {
      compileTabData(attr.$mdTabsTemplate);
      delete attr.$mdTabsTemplate;

      $mdUtil.initOptionalProperties(scope, attr);

      //-- watch attributes
      attr.$observe('mdNoBar', function (value) { scope.noInkBar = angular.isDefined(value); });
      //-- set default value for selectedIndex
      scope.selectedIndex = angular.isNumber(scope.selectedIndex) ? scope.selectedIndex : 0;
      //-- apply themes
      $mdTheming(element);

      function compileTabData (template) {
        var dataElement = element.find('md-tab-data');
        dataElement.html(template);
        $compile(dataElement.contents())(scope.$parent);
      }
    }
  };
}
MdTabs.$inject = ["$mdTheming", "$mdUtil", "$compile"];

angular
    .module('material.components.tabs')
    .directive('mdTemplate', MdTemplate);

function MdTemplate ($compile) {
  return {
    restrict: 'A',
    link: link,
    scope: {
      template: '=mdTemplate',
      compileScope: '=mdScope'
    },
    require: '^?mdTabs'
  };
  function link (scope, element, attr, ctrl) {
    if (!ctrl) return;
    element.html(scope.template);
    $compile(element.contents())(scope.compileScope);
  }
}
MdTemplate.$inject = ["$compile"];

})();
