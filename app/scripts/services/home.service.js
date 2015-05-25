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
