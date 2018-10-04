/*jshint latedef: false */
(function(){
    'use strict';

    angular.module('rbApp')
        .service('leftMenuService', ['$q', 'CONFIG', LeftMenuService ]);

            /**
             * Users DataService
             * Uses embedded, hard-coded data model; acts asynchronously to simulate
             * remote data service call(s).
             *
             * @returns {{loadAll: Function}}
             * @constructor
             */
            function LeftMenuService($q, CONFIG){
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
                        label: 'Experience',
                        alt: 'Work',
                        href: '/work/' + CONFIG.LAST_YEAR,
                        target : '',
                        imgsrc: 'images/menu/work.svg'
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
