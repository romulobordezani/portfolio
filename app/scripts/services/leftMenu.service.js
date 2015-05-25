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

                    /*

                    {
                        label: 'ABOUT',
                        alt: 'About',
                        href: '/about',
                        target : '',
                        imgsrc: 'images/about.png'
                    },

                    */

                    {
                        label: 'WORK',
                        alt: 'Work',
                        href: '/work',
                        target : '',
                        imgsrc: 'images/menu/work.svg'
                    },

                    /*,

                    {
                        label: 'GAMES',
                        alt: 'Games',
                        href: '/games',
                        target : '',
                        imgsrc: 'images/games.png'
                    },

                    /*

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


                     /*

                    {
                        label: 'PINTEREST',
                        alt: 'Pinterest',
                        target : '_BLANK',
                        href: 'https://www.pinterest.com/romulobordezani/',
                        imgsrc: 'images/pinterest.png'
                    },

                    */

                    {
                        label: 'SOPHIA\'S PICS',
                        alt: 'Sophia',
                        href: 'http://romulobordezani.com.br/sophia',
                        target : '',
                        imgsrc: 'images/menu/sophia.svg'
                    },

                    {
                        label: 'Blog',
                        alt: 'Blog - Modernet',
                        href: 'http://modernet.com.br/',
                        target : '',
                        imgsrc: 'images/menu/blog.svg'
                    },

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
