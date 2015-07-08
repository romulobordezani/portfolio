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
                        label: 'WORK',
                        alt: 'Work',
                        href: '/work/2015',
                        target : '',
                        imgsrc: 'images/menu/work.svg'
                    },

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
